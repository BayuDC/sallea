const stopAnimBubble = element => {
    element.addEventListener('animationend', e => {
        e.stopPropagation();
    });
};
const animToggle = (element, whenActive, whenNotActive) => {
    if (element.classList.contains('active')) {
        return whenActive();
    }
    whenNotActive();
};
const clickOnEnter = element => {
    element?.addEventListener('keyup', e => {
        if (e.key == 'Enter') element.click();
    });
};

const gallery = document.getElementById('gallery');
const galleryResize = () => {
    const width = gallery?.offsetWidth;
    gallery?.setAttribute('style', `column-count: ${Math.floor(width / 300)}`);
};
const errorPage = (msg = 'Something Went Wrong') => {
    gallery.id = 'error';
    gallery.innerHTML = `
        <h1>404</h1>
        <p>${msg}</p>
    `;
};
const setLoadEvent = () => {
    [...gallery.children].forEach(child => {
        if (child.getAttribute('class') != 'img') return;
        const img = child.children[0];
        const show = () => {
            if (gallery.hasAttribute('class')) {
                gallery.removeAttribute('class');
                gallery.removeChild(gallery.firstElementChild);
            }
            child.removeAttribute('style');
            gallery.appendChild(child);
        };
        if (img.complete) return show();
        img.addEventListener('load', show);
        img.addEventListener('error', () => {
            if (child.parentElement == gallery) {
                gallery.removeChild(child);
                if (gallery.childElementCount == 1 && !gallery.lastElementChild.classList.contains('img')) {
                    errorPage();
                }
            }
        });
    });
};
galleryResize();
window.addEventListener('resize', galleryResize);
if (gallery) {
    [...gallery.children].forEach(child => {
        child.addEventListener('keyup', e => {
            if (e.key == 'Enter') {
                child.children[1].click();
            }
        });
    });
    setLoadEvent();
}

const btnRefresh = document.getElementById('btn-refresh');
btnRefresh?.addEventListener('click', async () => {
    btnRefresh.classList.add('click');
    const clearGallery = () => {
        [...gallery.children].forEach(child => {
            if (child.getAttribute('class') != 'img') return;
            const img = child.children[0];
            img.src = '';
        });
    };
    const loadElement = `
        <div class="load-box">
        <span class="material-icons">circle</span>
        <span class="material-icons">circle</span>
        <span class="material-icons">circle</span>
        <span class="material-icons">circle</span>
        </div>`;
    clearGallery();
    gallery.id = 'gallery';
    gallery.classList.add('load');
    gallery.innerHTML = loadElement;
    try {
        const res = await fetch(document.URL + '?type=json');
        const images = await res.json();
        if (!res.ok) return errorPage(images.msg);

        clearGallery();
        gallery.id = 'gallery';
        gallery.innerHTML = images.reduce((result, img) => {
            return (
                result +
                `<div class="img" style="display: none" tabindex="0">
                    <img src="/i/${img}?width=320">
                    <a href="/f/${img}" class="btn btn-float btn-image" tabindex="-1">
                    <span class="material-icons-outlined">image</span>
                    </a>
                    <a href="/d/${img}" class="btn btn-float btn-download" tabindex="-1">
                    <span class="material-icons-outlined">file_download</span>
                    </a>
                </div>`
            );
        }, loadElement);
        setLoadEvent();
    } catch {
        errorPage();
    }
});
btnRefresh?.addEventListener('animationend', e => {
    btnRefresh.classList.remove('click');
});

clickOnEnter(btnRefresh);

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu?.addEventListener('click', () => {
    animToggle(
        menu,
        () => menu.classList.add('hide'),
        () => menu.classList.add('show')
    );
});
clickOnEnter(btnMenu);
menu?.addEventListener('animationend', () => {
    const setTabIndex = tabIndex => {
        [...menu.children].forEach(child => {
            if (child.classList.contains('sub-item')) return;
            child.setAttribute('tabIndex', tabIndex);
        });
    };
    menu.classList.remove('show', 'hide');
    animToggle(
        menu,
        () => {
            menu.classList.remove('active');
            setTabIndex(-1);
        },
        () => {
            menu.classList.add('active');
            setTabIndex(0);
        }
    );
});
if (menu) {
    [...menu.getElementsByTagName('a')].forEach(a => {
        a.addEventListener('click', e => {
            if (!gallery) return;
            e.preventDefault();
            if (a.href == document.URL) return;
            window.history.pushState({}, '', a.href);
            btnRefresh?.click();
            if (document.body.offsetWidth <= 768) btnMenu?.click();
        });
    });
}

const subMenus = document.getElementsByClassName('sub-menu');
[...subMenus].forEach(subMenu => {
    const subItem = subMenu.nextElementSibling;
    const btn = subMenu.children[0];
    subMenu.addEventListener('click', () => {
        animToggle(
            subMenu,
            () => {
                subItem.classList.add('hide');
                btn.classList.add('end');
            },
            () => {
                subItem.classList.add('show');
                btn.classList.add('start');
            }
        );
    });
    clickOnEnter(subMenu);
    subMenu.addEventListener('animationend', e => {
        const setTabIndex = tabIndex => [...subItem.children].forEach(child => child.setAttribute('tabIndex', tabIndex));

        btn.classList.remove('start', 'end');
        subItem.classList.remove('show', 'hide');
        animToggle(
            subMenu,
            () => {
                subItem.classList.remove('active');
                subMenu.classList.remove('active');
                setTabIndex(-1);
            },
            () => {
                subItem.classList.add('active');
                subMenu.classList.add('active');
                setTabIndex(0);
            }
        );
    });
    stopAnimBubble(subMenu);
    stopAnimBubble(subItem);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3BBbmltQnViYmxlID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgYW5pbVRvZ2dsZSA9IChlbGVtZW50LCB3aGVuQWN0aXZlLCB3aGVuTm90QWN0aXZlKSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZW5BY3RpdmUoKTtcclxuICAgIH1cclxuICAgIHdoZW5Ob3RBY3RpdmUoKTtcclxufTtcclxuY29uc3QgY2xpY2tPbkVudGVyID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSBlbGVtZW50LmNsaWNrKCk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiY29uc3QgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5Jyk7XHJcbmNvbnN0IGdhbGxlcnlSZXNpemUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IGdhbGxlcnk/Lm9mZnNldFdpZHRoO1xyXG4gICAgZ2FsbGVyeT8uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBjb2x1bW4tY291bnQ6ICR7TWF0aC5mbG9vcih3aWR0aCAvIDMwMCl9YCk7XHJcbn07XHJcbmNvbnN0IGVycm9yUGFnZSA9IChtc2cgPSAnU29tZXRoaW5nIFdlbnQgV3JvbmcnKSA9PiB7XHJcbiAgICBnYWxsZXJ5LmlkID0gJ2Vycm9yJztcclxuICAgIGdhbGxlcnkuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxoMT40MDQ8L2gxPlxyXG4gICAgICAgIDxwPiR7bXNnfTwvcD5cclxuICAgIGA7XHJcbn07XHJcbmNvbnN0IHNldExvYWRFdmVudCA9ICgpID0+IHtcclxuICAgIFsuLi5nYWxsZXJ5LmNoaWxkcmVuXS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdjbGFzcycpICE9ICdpbWcnKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgaW1nID0gY2hpbGQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgY29uc3Qgc2hvdyA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGdhbGxlcnkuaGFzQXR0cmlidXRlKCdjbGFzcycpKSB7XHJcbiAgICAgICAgICAgICAgICBnYWxsZXJ5LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuICAgICAgICAgICAgICAgIGdhbGxlcnkucmVtb3ZlQ2hpbGQoZ2FsbGVyeS5maXJzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2hpbGQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICBnYWxsZXJ5LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChpbWcuY29tcGxldGUpIHJldHVybiBzaG93KCk7XHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzaG93KTtcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnRFbGVtZW50ID09IGdhbGxlcnkpIHtcclxuICAgICAgICAgICAgICAgIGdhbGxlcnkucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbGxlcnkuY2hpbGRFbGVtZW50Q291bnQgPT0gMSAmJiAhZ2FsbGVyeS5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucygnaW1nJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvclBhZ2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcbmdhbGxlcnlSZXNpemUoKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGdhbGxlcnlSZXNpemUpO1xyXG5pZiAoZ2FsbGVyeSkge1xyXG4gICAgWy4uLmdhbGxlcnkuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlblsxXS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHNldExvYWRFdmVudCgpO1xyXG59XHJcbiIsImNvbnN0IGJ0blJlZnJlc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXJlZnJlc2gnKTtcclxuYnRuUmVmcmVzaD8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBidG5SZWZyZXNoLmNsYXNzTGlzdC5hZGQoJ2NsaWNrJyk7XHJcbiAgICBjb25zdCBjbGVhckdhbGxlcnkgPSAoKSA9PiB7XHJcbiAgICAgICAgWy4uLmdhbGxlcnkuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdjbGFzcycpICE9ICdpbWcnKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGNoaWxkLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgbG9hZEVsZW1lbnQgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxvYWQtYm94XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2lyY2xlPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jaXJjbGU8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5gO1xyXG4gICAgY2xlYXJHYWxsZXJ5KCk7XHJcbiAgICBnYWxsZXJ5LmlkID0gJ2dhbGxlcnknO1xyXG4gICAgZ2FsbGVyeS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XHJcbiAgICBnYWxsZXJ5LmlubmVySFRNTCA9IGxvYWRFbGVtZW50O1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChkb2N1bWVudC5VUkwgKyAnP3R5cGU9anNvbicpO1xyXG4gICAgICAgIGNvbnN0IGltYWdlcyA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgaWYgKCFyZXMub2spIHJldHVybiBlcnJvclBhZ2UoaW1hZ2VzLm1zZyk7XHJcblxyXG4gICAgICAgIGNsZWFyR2FsbGVyeSgpO1xyXG4gICAgICAgIGdhbGxlcnkuaWQgPSAnZ2FsbGVyeSc7XHJcbiAgICAgICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBpbWFnZXMucmVkdWNlKChyZXN1bHQsIGltZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICtcclxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaW1nXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdGFiaW5kZXg9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaS8ke2ltZ30/d2lkdGg9MzIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9mLyR7aW1nfVwiIGNsYXNzPVwiYnRuIGJ0bi1mbG9hdCBidG4taW1hZ2VcIiB0YWJpbmRleD1cIi0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmltYWdlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2QvJHtpbWd9XCIgY2xhc3M9XCJidG4gYnRuLWZsb2F0IGJ0bi1kb3dubG9hZFwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+ZmlsZV9kb3dubG9hZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSwgbG9hZEVsZW1lbnQpO1xyXG4gICAgICAgIHNldExvYWRFdmVudCgpO1xyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgICAgZXJyb3JQYWdlKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2snKTtcclxufSk7XHJcblxyXG5jbGlja09uRW50ZXIoYnRuUmVmcmVzaCk7XHJcbiIsImNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1lbnUnKTtcclxuY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Jyk7XHJcblxyXG5idG5NZW51Py5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxyXG4gICAgKTtcclxufSk7XHJcbmNsaWNrT25FbnRlcihidG5NZW51KTtcclxubWVudT8uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiB7XHJcbiAgICAgICAgWy4uLm1lbnUuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItaXRlbScpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSk7XHJcbmlmIChtZW51KSB7XHJcbiAgICBbLi4ubWVudS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpXS5mb3JFYWNoKGEgPT4ge1xyXG4gICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKCFnYWxsZXJ5KSByZXR1cm47XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGEuaHJlZiA9PSBkb2N1bWVudC5VUkwpIHJldHVybjtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgYS5ocmVmKTtcclxuICAgICAgICAgICAgYnRuUmVmcmVzaD8uY2xpY2soKTtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggPD0gNzY4KSBidG5NZW51Py5jbGljaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuIiwiY29uc3Qgc3ViTWVudXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdWItbWVudScpO1xyXG5bLi4uc3ViTWVudXNdLmZvckVhY2goc3ViTWVudSA9PiB7XHJcbiAgICBjb25zdCBzdWJJdGVtID0gc3ViTWVudS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICBjb25zdCBidG4gPSBzdWJNZW51LmNoaWxkcmVuWzBdO1xyXG4gICAgc3ViTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBhbmltVG9nZ2xlKFxyXG4gICAgICAgICAgICBzdWJNZW51LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdlbmQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc3RhcnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGNsaWNrT25FbnRlcihzdWJNZW51KTtcclxuICAgIHN1Yk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiBbLi4uc3ViSXRlbS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgdGFiSW5kZXgpKTtcclxuXHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJ0JywgJ2VuZCcpO1xyXG4gICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycsICdoaWRlJyk7XHJcbiAgICAgICAgYW5pbVRvZ2dsZShcclxuICAgICAgICAgICAgc3ViTWVudSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUYWJJbmRleCgtMSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBzdG9wQW5pbUJ1YmJsZShzdWJNZW51KTtcclxuICAgIHN0b3BBbmltQnViYmxlKHN1Ykl0ZW0pO1xyXG59KTtcclxuIl19
