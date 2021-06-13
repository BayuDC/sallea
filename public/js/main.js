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
const setLoadEvent = () => {
    [...gallery.children].forEach(child => {
        const img = child.children[0];
        const show = () => {
            child.removeAttribute('style');
            gallery.appendChild(child);
        };
        if (img.complete) return show();
        img.addEventListener('load', show);
        img.addEventListener('error', () => {
            gallery.removeChild(child);
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
            }, '');
            setLoadEvent();
        })
        .catch(() => {
            gallery.id = 'error';
            gallery.innerHTML = `
                <h1>404</h1>
                <p>Something Went Wrong</p>
            `;
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3BBbmltQnViYmxlID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgYW5pbVRvZ2dsZSA9IChlbGVtZW50LCB3aGVuQWN0aXZlLCB3aGVuTm90QWN0aXZlKSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZW5BY3RpdmUoKTtcclxuICAgIH1cclxuICAgIHdoZW5Ob3RBY3RpdmUoKTtcclxufTtcclxuY29uc3QgY2xpY2tPbkVudGVyID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSBlbGVtZW50LmNsaWNrKCk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiY29uc3QgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5Jyk7XHJcbmNvbnN0IGdhbGxlcnlSZXNpemUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IGdhbGxlcnk/Lm9mZnNldFdpZHRoO1xyXG4gICAgZ2FsbGVyeT8uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBjb2x1bW4tY291bnQ6ICR7TWF0aC5mbG9vcih3aWR0aCAvIDMwMCl9YCk7XHJcbn07XHJcbmNvbnN0IHNldExvYWRFdmVudCA9ICgpID0+IHtcclxuICAgIFsuLi5nYWxsZXJ5LmNoaWxkcmVuXS5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICBjb25zdCBpbWcgPSBjaGlsZC5jaGlsZHJlblswXTtcclxuICAgICAgICBjb25zdCBzaG93ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIGdhbGxlcnkuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGltZy5jb21wbGV0ZSkgcmV0dXJuIHNob3coKTtcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNob3cpO1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcclxuICAgICAgICAgICAgZ2FsbGVyeS5yZW1vdmVDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuZ2FsbGVyeVJlc2l6ZSgpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZ2FsbGVyeVJlc2l6ZSk7XHJcbmlmIChnYWxsZXJ5KSB7XHJcbiAgICBbLi4uZ2FsbGVyeS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuWzFdLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgc2V0TG9hZEV2ZW50KCk7XHJcbn1cclxuIiwiY29uc3QgYnRuUmVmcmVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tcmVmcmVzaCcpO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LmFkZCgnY2xpY2snKTtcclxuICAgIGZldGNoKGRvY3VtZW50LlVSTCArICc/dHlwZT1qc29uJylcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlcy5vaykgdGhyb3cgRXJyb3I7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oaW1hZ2VzID0+IHtcclxuICAgICAgICAgICAgZ2FsbGVyeS5pZCA9ICdnYWxsZXJ5JztcclxuICAgICAgICAgICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBpbWFnZXMucmVkdWNlKChyZXN1bHQsIGltZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiaW1nXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdGFiaW5kZXg9XCIwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2kvJHtpbWd9P3dpZHRoPTMyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2YvJHtpbWd9XCIgY2xhc3M9XCJidG4gYnRuLWZsb2F0IGJ0bi1pbWFnZVwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5pbWFnZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2QvJHtpbWd9XCIgY2xhc3M9XCJidG4gYnRuLWZsb2F0IGJ0bi1kb3dubG9hZFwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5maWxlX2Rvd25sb2FkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSwgJycpO1xyXG4gICAgICAgICAgICBzZXRMb2FkRXZlbnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGdhbGxlcnkuaWQgPSAnZXJyb3InO1xyXG4gICAgICAgICAgICBnYWxsZXJ5LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxoMT40MDQ8L2gxPlxyXG4gICAgICAgICAgICAgICAgPHA+U29tZXRoaW5nIHdlbnQgV3Jvbmc8L3A+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2snKTtcclxufSk7XHJcblxyXG5jbGlja09uRW50ZXIoYnRuUmVmcmVzaCk7XHJcbiIsImNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1lbnUnKTtcclxuY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Jyk7XHJcblxyXG5idG5NZW51Py5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxyXG4gICAgKTtcclxufSk7XHJcbmNsaWNrT25FbnRlcihidG5NZW51KTtcclxubWVudT8uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiB7XHJcbiAgICAgICAgWy4uLm1lbnUuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItaXRlbScpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSk7XHJcbiIsImNvbnN0IHN1Yk1lbnVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3ViLW1lbnUnKTtcclxuWy4uLnN1Yk1lbnVzXS5mb3JFYWNoKHN1Yk1lbnUgPT4ge1xyXG4gICAgY29uc3Qgc3ViSXRlbSA9IHN1Yk1lbnUubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgY29uc3QgYnRuID0gc3ViTWVudS5jaGlsZHJlblswXTtcclxuICAgIHN1Yk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgYW5pbVRvZ2dsZShcclxuICAgICAgICAgICAgc3ViTWVudSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZW5kJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBjbGlja09uRW50ZXIoc3ViTWVudSk7XHJcbiAgICBzdWJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNldFRhYkluZGV4ID0gdGFiSW5kZXggPT4gWy4uLnN1Ykl0ZW0uY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRhYkluZGV4KSk7XHJcblxyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydCcsICdlbmQnKTtcclxuICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnaGlkZScpO1xyXG4gICAgICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgICAgIHN1Yk1lbnUsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGFiSW5kZXgoLTEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRhYkluZGV4KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgc3RvcEFuaW1CdWJibGUoc3ViTWVudSk7XHJcbiAgICBzdG9wQW5pbUJ1YmJsZShzdWJJdGVtKTtcclxufSk7XHJcbiJdfQ==
