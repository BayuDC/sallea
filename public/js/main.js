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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImEuanMiLCJjb250ZW50LmpzIiwiaGVhZGVyLmpzIiwibWVudS5qcyIsInN1Yi1tZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RvcEFuaW1CdWJibGUgPSBlbGVtZW50ID0+IHtcclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZSA9PiB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCBhbmltVG9nZ2xlID0gKGVsZW1lbnQsIHdoZW5BY3RpdmUsIHdoZW5Ob3RBY3RpdmUpID0+IHtcclxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICByZXR1cm4gd2hlbkFjdGl2ZSgpO1xyXG4gICAgfVxyXG4gICAgd2hlbk5vdEFjdGl2ZSgpO1xyXG59O1xyXG5jb25zdCBjbGlja09uRW50ZXIgPSBlbGVtZW50ID0+IHtcclxuICAgIGVsZW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIGVsZW1lbnQuY2xpY2soKTtcclxuICAgIH0pO1xyXG59O1xyXG4iLCJjb25zdCBnYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKTtcclxuY29uc3QgZ2FsbGVyeVJlc2l6ZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHdpZHRoID0gZ2FsbGVyeT8ub2Zmc2V0V2lkdGg7XHJcbiAgICBnYWxsZXJ5Py5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGNvbHVtbi1jb3VudDogJHtNYXRoLmZsb29yKHdpZHRoIC8gMzAwKX1gKTtcclxufTtcclxuZ2FsbGVyeVJlc2l6ZSgpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZ2FsbGVyeVJlc2l6ZSk7XHJcbmlmIChnYWxsZXJ5KSB7XHJcbiAgICBbLi4uZ2FsbGVyeS5jaGlsZHJlbl0uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09ICdFbnRlcicpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuWzFdLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbiIsImNvbnN0IGJ0blJlZnJlc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLXJlZnJlc2gnKTtcclxuYnRuUmVmcmVzaD8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBidG5SZWZyZXNoLmNsYXNzTGlzdC5hZGQoJ2NsaWNrJyk7XHJcbn0pO1xyXG5idG5SZWZyZXNoPy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBlID0+IHtcclxuICAgIGJ0blJlZnJlc2guY2xhc3NMaXN0LnJlbW92ZSgnY2xpY2snKTtcclxufSk7XHJcblxyXG5jbGlja09uRW50ZXIoYnRuUmVmcmVzaCk7XHJcbiIsImNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuLW1lbnUnKTtcclxuY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Jyk7XHJcblxyXG5idG5NZW51Py5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSxcclxuICAgICAgICAoKSA9PiBtZW51LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxyXG4gICAgKTtcclxufSk7XHJcbmNsaWNrT25FbnRlcihidG5NZW51KTtcclxubWVudT8uYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2V0VGFiSW5kZXggPSB0YWJJbmRleCA9PiB7XHJcbiAgICAgICAgWy4uLm1lbnUuY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWItaXRlbScpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgndGFiSW5kZXgnLCB0YWJJbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JywgJ2hpZGUnKTtcclxuICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgbWVudSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNldFRhYkluZGV4KC0xKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXgoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSk7XHJcbiIsImNvbnN0IHN1Yk1lbnVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3ViLW1lbnUnKTtcclxuWy4uLnN1Yk1lbnVzXS5mb3JFYWNoKHN1Yk1lbnUgPT4ge1xyXG4gICAgY29uc3Qgc3ViSXRlbSA9IHN1Yk1lbnUubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgY29uc3QgYnRuID0gc3ViTWVudS5jaGlsZHJlblswXTtcclxuICAgIHN1Yk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgYW5pbVRvZ2dsZShcclxuICAgICAgICAgICAgc3ViTWVudSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3ViSXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZW5kJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBjbGlja09uRW50ZXIoc3ViTWVudSk7XHJcbiAgICBzdWJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNldFRhYkluZGV4ID0gdGFiSW5kZXggPT4gWy4uLnN1Ykl0ZW0uY2hpbGRyZW5dLmZvckVhY2goY2hpbGQgPT4gY2hpbGQuc2V0QXR0cmlidXRlKCd0YWJJbmRleCcsIHRhYkluZGV4KSk7XHJcblxyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzdGFydCcsICdlbmQnKTtcclxuICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnLCAnaGlkZScpO1xyXG4gICAgICAgIGFuaW1Ub2dnbGUoXHJcbiAgICAgICAgICAgIHN1Yk1lbnUsXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHN1Ykl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdWJNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGFiSW5kZXgoLTEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdWJJdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHNldFRhYkluZGV4KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgc3RvcEFuaW1CdWJibGUoc3ViTWVudSk7XHJcbiAgICBzdG9wQW5pbUJ1YmJsZShzdWJJdGVtKTtcclxufSk7XHJcbiJdfQ==
