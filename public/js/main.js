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
}

const btnRefresh = document.getElementById('btn-refresh');
btnRefresh?.addEventListener('click', () => {
    btnRefresh.classList.add('click');
    fetch(document.URL + '?type=json')
        .then(res => res.json())
        .then(images => {
            gallery.innerHTML = images.reduce((result, img) => {
                return (
                    result +
                    `<div class="img" tabindex="0">
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN0b3BBbmltQnViYmxlID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxufTtcclxuY29uc3QgYW5pbVRvZ2dsZSA9IChlbGVtZW50LCB3aGVuQWN0aXZlLCB3aGVuTm90QWN0aXZlKSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgcmV0dXJuIHdoZW5BY3RpdmUoKTtcclxuICAgIH1cclxuICAgIHdoZW5Ob3RBY3RpdmUoKTtcclxufTtcclxuY29uc3QgY2xpY2tPbkVudGVyID0gZWxlbWVudCA9PiB7XHJcbiAgICBlbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSBlbGVtZW50LmNsaWNrKCk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiY29uc3QgZ2FsbGVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5Jyk7XHJcbmNvbnN0IGdhbGxlcnlSZXNpemUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IGdhbGxlcnk/Lm9mZnNldFdpZHRoO1xyXG4gICAgZ2FsbGVyeT8uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBjb2x1bW4tY291bnQ6ICR7TWF0aC5mbG9vcih3aWR0aCAvIDMwMCl9YCk7XHJcbn07XHJcbmdhbGxlcnlSZXNpemUoKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGdhbGxlcnlSZXNpemUpO1xyXG5pZiAoZ2FsbGVyeSkge1xyXG4gICAgWy4uLmdhbGxlcnkuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlblsxXS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJjb25zdCBidG5SZWZyZXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bi1yZWZyZXNoJyk7XHJcbmJ0blJlZnJlc2g/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYnRuUmVmcmVzaC5jbGFzc0xpc3QuYWRkKCdjbGljaycpO1xyXG4gICAgZmV0Y2goZG9jdW1lbnQuVVJMICsgJz90eXBlPWpzb24nKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGltYWdlcyA9PiB7XHJcbiAgICAgICAgICAgIGdhbGxlcnkuaW5uZXJIVE1MID0gaW1hZ2VzLnJlZHVjZSgocmVzdWx0LCBpbWcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cImltZ1wiIHRhYmluZGV4PVwiMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9pLyR7aW1nfT93aWR0aD0zMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9mLyR7aW1nfVwiIGNsYXNzPVwiYnRuIGJ0bi1mbG9hdCBidG4taW1hZ2VcIiB0YWJpbmRleD1cIi0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+aW1hZ2U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9kLyR7aW1nfVwiIGNsYXNzPVwiYnRuIGJ0bi1mbG9hdCBidG4tZG93bmxvYWRcIiB0YWJpbmRleD1cIi0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+ZmlsZV9kb3dubG9hZDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sICcnKTtcclxuICAgICAgICB9KTtcclxufSk7XHJcbmJ0blJlZnJlc2g/LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgYnRuUmVmcmVzaC5jbGFzc0xpc3QucmVtb3ZlKCdjbGljaycpO1xyXG59KTtcclxuXHJcbmNsaWNrT25FbnRlcihidG5SZWZyZXNoKTtcclxuIiwiY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWVudScpO1xyXG5jb25zdCBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKTtcclxuXHJcbmJ0bk1lbnU/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYW5pbVRvZ2dsZShcclxuICAgICAgICBtZW51LFxyXG4gICAgICAgICgpID0+IG1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZScpLFxyXG4gICAgICAgICgpID0+IG1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdycpXHJcbiAgICApO1xyXG59KTtcclxuY2xpY2tPbkVudGVyKGJ0bk1lbnUpO1xyXG5tZW51Py5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzZXRUYWJJbmRleCA9IHRhYkluZGV4ID0+IHtcclxuICAgICAgICBbLi4ubWVudS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1pdGVtJykpIHJldHVybjtcclxuICAgICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRhYkluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnaGlkZScpO1xyXG4gICAgYW5pbVRvZ2dsZShcclxuICAgICAgICBtZW51LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoLTEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBzZXRUYWJJbmRleCgwKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KTtcclxuIiwiY29uc3Qgc3ViTWVudXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdWItbWVudScpO1xyXG5bLi4uc3ViTWVudXNdLmZvckVhY2goc3ViTWVudSA9PiB7XHJcbiAgICBjb25zdCBzdWJJdGVtID0gc3ViTWVudS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICBjb25zdCBidG4gPSBzdWJNZW51LmNoaWxkcmVuWzBdO1xyXG4gICAgc3ViTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBhbmltVG9nZ2xlKFxyXG4gICAgICAgICAgICBzdWJNZW51LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdlbmQnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnc3RhcnQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGNsaWNrT25FbnRlcihzdWJNZW51KTtcclxuICAgIHN1Yk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiBbLi4uc3ViSXRlbS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiBjaGlsZC5zZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JywgdGFiSW5kZXgpKTtcclxuXHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXJ0JywgJ2VuZCcpO1xyXG4gICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycsICdoaWRlJyk7XHJcbiAgICAgICAgYW5pbVRvZ2dsZShcclxuICAgICAgICAgICAgc3ViTWVudSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUYWJJbmRleCgtMSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBzdG9wQW5pbUJ1YmJsZShzdWJNZW51KTtcclxuICAgIHN0b3BBbmltQnViYmxlKHN1Ykl0ZW0pO1xyXG59KTtcclxuIl19
