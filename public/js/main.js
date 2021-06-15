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
btnRefresh?.addEventListener('click', async () => {
    btnRefresh.classList.add('click');
    gallery.id = 'gallery';
    gallery.classList.add('load');
    gallery.innerHTML = `
        <div class="load-box">
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
            <span class="material-icons">circle</span>
        </div>
    `;
    try {
        const res = await fetch(document.URL + '?type=json');
        const images = await res.json();
        if (!res.ok) {
            return errorPage(images.msg);
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RvcEFuaW1CdWJibGUgPSBlbGVtZW50ID0+IHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZSA9PiB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCBhbmltVG9nZ2xlID0gKGVsZW1lbnQsIHdoZW5BY3RpdmUsIHdoZW5Ob3RBY3RpdmUpID0+IHtcclxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICByZXR1cm4gd2hlbkFjdGl2ZSgpO1xyXG4gICAgfVxyXG4gICAgd2hlbk5vdEFjdGl2ZSgpO1xyXG59O1xyXG5jb25zdCBjbGlja09uRW50ZXIgPSBlbGVtZW50ID0+IHtcclxuICAgIGVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIGVsZW1lbnQuY2xpY2soKTtcclxuICAgIH0pO1xyXG59O1xyXG4iLCJjb25zdCBnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKTtcclxuY29uc3QgZ2FsbGVyeVJlc2l6ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHdpZHRoID0gZ2FsbGVyeT8ub2Zmc2V0V2lkdGg7XHJcbiAgICBnYWxsZXJ5Py5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGNvbHVtbi1jb3VudDogJHtNYXRoLmZsb29yKHdpZHRoIC8gMzAwKX1gKTtcclxufTtcclxuY29uc3QgZXJyb3JQYWdlID0gKG1zZyA9ICdTb21ldGhpbmcgV2VudCBXcm9uZycpID0+IHtcclxuICAgIGdhbGxlcnkuaWQgPSAnZXJyb3InO1xyXG4gICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGgxPjQwNDwvaDE+XHJcbiAgICAgICAgPHA+JHttc2d9PC9wPlxyXG4gICAgYDtcclxufTtcclxuY29uc3Qgc2V0TG9hZEV2ZW50ID0gKCkgPT4ge1xyXG4gICAgWy4uLmdhbGxlcnkuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgIT0gJ2ltZycpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBjaGlsZC5jaGlsZHJlblswXTtcclxuICAgICAgICBjb25zdCBzaG93ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZ2FsbGVyeS5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykpIHtcclxuICAgICAgICAgICAgICAgIGdhbGxlcnkucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgICAgICAgICAgICAgZ2FsbGVyeS5yZW1vdmVDaGlsZChnYWxsZXJ5LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjaGlsZC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIGdhbGxlcnkuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGltZy5jb21wbGV0ZSkgcmV0dXJuIHNob3coKTtcclxuICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNob3cpO1xyXG4gICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcclxuICAgICAgICAgICAgZ2FsbGVyeS5yZW1vdmVDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgIGlmIChnYWxsZXJ5LmNoaWxkRWxlbWVudENvdW50ID09IDEgJiYgIWdhbGxlcnkubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ2ltZycpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvclBhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcbmdhbGxlcnlSZXNpemUoKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGdhbGxlcnlSZXNpemUpO1xyXG5pZiAoZ2FsbGVyeSkge1xyXG4gICAgWy4uLmdhbGxlcnkuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5jaGlsZHJlblsxXS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHNldExvYWRFdmVudCgpO1xyXG59XHJcbiIsImNvbnN0IGJ0blJlZnJlc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXJlZnJlc2gnKTtcclxuYnRuUmVmcmVzaD8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBidG5SZWZyZXNoLmNsYXNzTGlzdC5hZGQoJ2NsaWNrJyk7XHJcbiAgICBnYWxsZXJ5LmlkID0gJ2dhbGxlcnknO1xyXG4gICAgZ2FsbGVyeS5jbGFzc0xpc3QuYWRkKCdsb2FkJyk7XHJcbiAgICBnYWxsZXJ5LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibG9hZC1ib3hcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNpcmNsZTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGRvY3VtZW50LlVSTCArICc/dHlwZT1qc29uJyk7XHJcbiAgICAgICAgY29uc3QgaW1hZ2VzID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JQYWdlKGltYWdlcy5tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnYWxsZXJ5LmlubmVySFRNTCA9IGltYWdlcy5yZWR1Y2UoKHJlc3VsdCwgaW1nKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgK1xyXG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJpbWdcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0YWJpbmRleD1cIjBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9pLyR7aW1nfT93aWR0aD0zMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2YvJHtpbWd9XCIgY2xhc3M9XCJidG4gYnRuLWZsb2F0IGJ0bi1pbWFnZVwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCI+aW1hZ2U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvZC8ke2ltZ31cIiBjbGFzcz1cImJ0biBidG4tZmxvYXQgYnRuLWRvd25sb2FkXCIgdGFiaW5kZXg9XCItMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIj5maWxlX2Rvd25sb2FkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LCBnYWxsZXJ5LmlubmVySFRNTCk7XHJcbiAgICAgICAgc2V0TG9hZEV2ZW50KCk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgICBlcnJvclBhZ2UoKTtcclxuICAgIH1cclxufSk7XHJcbmJ0blJlZnJlc2g/LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgYnRuUmVmcmVzaC5jbGFzc0xpc3QucmVtb3ZlKCdjbGljaycpO1xyXG59KTtcclxuXHJcbmNsaWNrT25FbnRlcihidG5SZWZyZXNoKTtcclxuIiwiY29uc3QgYnRuTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4tbWVudScpO1xyXG5jb25zdCBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKTtcclxuXHJcbmJ0bk1lbnU/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgYW5pbVRvZ2dsZShcclxuICAgICAgICBtZW51LFxyXG4gICAgICAgICgpID0+IG1lbnUuY2xhc3NMaXN0LmFkZCgnaGlkZScpLFxyXG4gICAgICAgICgpID0+IG1lbnUuY2xhc3NMaXN0LmFkZCgnc2hvdycpXHJcbiAgICApO1xyXG59KTtcclxuY2xpY2tPbkVudGVyKGJ0bk1lbnUpO1xyXG5tZW51Py5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzZXRUYWJJbmRleCA9IHRhYkluZGV4ID0+IHtcclxuICAgICAgICBbLi4ubWVudS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1pdGVtJykpIHJldHVybjtcclxuICAgICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRhYkluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnaGlkZScpO1xyXG4gICAgYW5pbVRvZ2dsZShcclxuICAgICAgICBtZW51LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoLTEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBzZXRUYWJJbmRleCgwKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KTtcclxuaWYgKG1lbnUpIHtcclxuICAgIFsuLi5tZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyldLmZvckVhY2goYSA9PiB7XHJcbiAgICAgICAgYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWdhbGxlcnkpIHJldHVybjtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoYS5ocmVmID09IGRvY3VtZW50LlVSTCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCBhLmhyZWYpO1xyXG4gICAgICAgICAgICBidG5SZWZyZXNoPy5jbGljaygpO1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCA8PSA3NjgpIGJ0bk1lbnU/LmNsaWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJjb25zdCBzdWJNZW51cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N1Yi1tZW51Jyk7XHJcblsuLi5zdWJNZW51c10uZm9yRWFjaChzdWJNZW51ID0+IHtcclxuICAgIGNvbnN0IHN1Ykl0ZW0gPSBzdWJNZW51Lm5leHRFbGVtZW50U2libGluZztcclxuICAgIGNvbnN0IGJ0biA9IHN1Yk1lbnUuY2hpbGRyZW5bMF07XHJcbiAgICBzdWJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgICAgIHN1Yk1lbnUsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2VuZCcpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdzdGFydCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgY2xpY2tPbkVudGVyKHN1Yk1lbnUpO1xyXG4gICAgc3ViTWVudS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgICAgICBjb25zdCBzZXRUYWJJbmRleCA9IHRhYkluZGV4ID0+IFsuLi5zdWJJdGVtLmNoaWxkcmVuXS5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCkpO1xyXG5cclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnc3RhcnQnLCAnZW5kJyk7XHJcbiAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgICAgICBhbmltVG9nZ2xlKFxyXG4gICAgICAgICAgICBzdWJNZW51LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUYWJJbmRleCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHN0b3BBbmltQnViYmxlKHN1Yk1lbnUpO1xyXG4gICAgc3RvcEFuaW1CdWJibGUoc3ViSXRlbSk7XHJcbn0pO1xyXG4iXX0=
