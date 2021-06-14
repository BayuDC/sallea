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
const errorPage = () => {
    gallery.id = 'error';
    gallery.innerHTML = `
        <h1>404</h1>
        <p>Something Went Wrong</p>
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
            gallery.removeChild(child);
            if (gallery.childElementCount == 1 && !gallery.lastElementChild.classList.contains('img')) {
                errorPage();
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
btnRefresh?.addEventListener('click', () => {
    btnRefresh.classList.add('click');
    gallery.classList.add('load');
    gallery.innerHTML = `
        <div class="load-box">
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
        </div>
    `;
    fetch(document.URL + '?type=json')
        .then(res => {
            if (!res.ok) throw Error;
            return res.json();
        })
        .then(images => {
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
            }, gallery.innerHTML);
            setLoadEvent();
        })
        .catch(errorPage);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3BBbmltQnViYmxlID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgYW5pbVRvZ2dsZSA9IChlbGVtZW50LCB3aGVuQWN0aXZlLCB3aGVuTm90QWN0aXZlKSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZW5BY3RpdmUoKTtcclxuICAgIH1cclxuICAgIHdoZW5Ob3RBY3RpdmUoKTtcclxufTtcclxuY29uc3QgY2xpY2tPbkVudGVyID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSBlbGVtZW50LmNsaWNrKCk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiY29uc3QgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5Jyk7XHJcbmNvbnN0IGdhbGxlcnlSZXNpemUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IGdhbGxlcnk/Lm9mZnNldFdpZHRoO1xyXG4gICAgZ2FsbGVyeT8uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBjb2x1bW4tY291bnQ6ICR7TWF0aC5mbG9vcih3aWR0aCAvIDMwMCl9YCk7XHJcbn07XHJcbmNvbnN0IGVycm9yUGFnZSA9ICgpID0+IHtcclxuICAgIGdhbGxlcnkuaWQgPSAnZXJyb3InO1xyXG4gICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGgxPjQwNDwvaDE+XHJcbiAgICAgICAgPHA+U29tZXRoaW5nIFdlbnQgV3Jvbmc8L3A+XHJcbiAgICBgO1xyXG59O1xyXG5jb25zdCBzZXRMb2FkRXZlbnQgPSAoKSA9PiB7XHJcbiAgICBbLi4uZ2FsbGVyeS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSAhPSAnaW1nJykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGNoaWxkLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIGNvbnN0IHNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnYWxsZXJ5Lmhhc0F0dHJpYnV0ZSgnY2xhc3MnKSkge1xyXG4gICAgICAgICAgICAgICAgZ2FsbGVyeS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XHJcbiAgICAgICAgICAgICAgICBnYWxsZXJ5LnJlbW92ZUNoaWxkKGdhbGxlcnkuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgZ2FsbGVyeS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoaW1nLmNvbXBsZXRlKSByZXR1cm4gc2hvdygpO1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2hvdyk7XHJcbiAgICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnYWxsZXJ5LnJlbW92ZUNoaWxkKGNoaWxkKTtcclxuICAgICAgICAgICAgaWYgKGdhbGxlcnkuY2hpbGRFbGVtZW50Q291bnQgPT0gMSAmJiAhZ2FsbGVyeS5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucygnaW1nJykpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yUGFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuZ2FsbGVyeVJlc2l6ZSgpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZ2FsbGVyeVJlc2l6ZSk7XHJcbmlmIChnYWxsZXJ5KSB7XHJcbiAgICBbLi4uZ2FsbGVyeS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuWzFdLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgc2V0TG9hZEV2ZW50KCk7XHJcbn1cclxuIiwiY29uc3QgYnRuUmVmcmVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tcmVmcmVzaCcpO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LmFkZCgnY2xpY2snKTtcclxuICAgIGdhbGxlcnkuY2xhc3NMaXN0LmFkZCgnbG9hZCcpO1xyXG4gICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxvYWQtYm94XCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jaXJjbGU8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jaXJjbGU8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jaXJjbGU8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jaXJjbGU8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgZmV0Y2goZG9jdW1lbnQuVVJMICsgJz90eXBlPWpzb24nKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBFcnJvcjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihpbWFnZXMgPT4ge1xyXG4gICAgICAgICAgICBnYWxsZXJ5LmlkID0gJ2dhbGxlcnknO1xyXG4gICAgICAgICAgICBnYWxsZXJ5LmlubmVySFRNTCA9IGltYWdlcy5yZWR1Y2UoKHJlc3VsdCwgaW1nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArXHJcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJpbWdcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0YWJpbmRleD1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvaS8ke2ltZ30/d2lkdGg9MzIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvZi8ke2ltZ31cIiBjbGFzcz1cImJ0biBidG4tZmxvYXQgYnRuLWltYWdlXCIgdGFiaW5kZXg9XCItMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmltYWdlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvZC8ke2ltZ31cIiBjbGFzcz1cImJ0biBidG4tZmxvYXQgYnRuLWRvd25sb2FkXCIgdGFiaW5kZXg9XCItMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiPmZpbGVfZG93bmxvYWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9LCBnYWxsZXJ5LmlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIHNldExvYWRFdmVudCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yUGFnZSk7XHJcbn0pO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2snKTtcclxufSk7XHJcblxyXG5jbGlja09uRW50ZXIoYnRuUmVmcmVzaCk7XHJcbiIsImNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1lbnUnKTtcclxuY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Jyk7XHJcblxyXG5idG5NZW51Py5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxyXG4gICAgKTtcclxufSk7XHJcbmNsaWNrT25FbnRlcihidG5NZW51KTtcclxubWVudT8uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiB7XHJcbiAgICAgICAgWy4uLm1lbnUuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItaXRlbScpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSk7XHJcbmlmIChtZW51KSB7XHJcbiAgICBbLi4ubWVudS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpXS5mb3JFYWNoKGEgPT4ge1xyXG4gICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBhLmhyZWYpO1xyXG4gICAgICAgICAgICBidG5SZWZyZXNoLmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJjb25zdCBzdWJNZW51cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1Yi1tZW51Jyk7XHJcblsuLi5zdWJNZW51c10uZm9yRWFjaChzdWJNZW51ID0+IHtcclxuICAgIGNvbnN0IHN1Ykl0ZW0gPSBzdWJNZW51Lm5leHRFbGVtZW50U2libGluZztcclxuICAgIGNvbnN0IGJ0biA9IHN1Yk1lbnUuY2hpbGRyZW5bMF07XHJcbiAgICBzdWJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgICAgIHN1Yk1lbnUsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2VuZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdGFydCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgY2xpY2tPbkVudGVyKHN1Yk1lbnUpO1xyXG4gICAgc3ViTWVudS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgICAgICBjb25zdCBzZXRUYWJJbmRleCA9IHRhYkluZGV4ID0+IFsuLi5zdWJJdGVtLmNoaWxkcmVuXS5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCkpO1xyXG5cclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc3RhcnQnLCAnZW5kJyk7XHJcbiAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgICAgICBhbmltVG9nZ2xlKFxyXG4gICAgICAgICAgICBzdWJNZW51LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUYWJJbmRleCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHN0b3BBbmltQnViYmxlKHN1Yk1lbnUpO1xyXG4gICAgc3RvcEFuaW1CdWJibGUoc3ViSXRlbSk7XHJcbn0pO1xyXG4iXX0=
