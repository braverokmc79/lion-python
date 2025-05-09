
// 코드 줄 번호 붙이기 (syntax highlighting 유지)
 document.addEventListener('DOMContentLoaded', () => {

      document.querySelectorAll('pre code').forEach((block) => {
      const lang = 'python'; // 강제 파이썬
      const code = block.textContent;
      const result = hljs.highlight(code, { language: lang }).value;
      const lines = result.split('\n');
      const padder = length => num => num.toString().padStart(length, ' ');
      const padNumber = padder(lines.length.toString().length);

      const numbered = lines.map((line, i) => 
        `<code class="line-number">${padNumber(i + 1)}</code><code class="code-line">${line}</code>`
      ).join('\n');

      // 복사 버튼 생성
      const copyBtn = document.createElement('button');
      copyBtn.textContent = '복사';
      copyBtn.className = 'copy-btn';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = '복사됨!';
          setTimeout(() => copyBtn.textContent = '복사', 1500);
        });
      });

      // 코드 블록 구성
      const wrapper = document.createElement('div');
      wrapper.className = 'highlight-wrapper';
      wrapper.innerHTML = numbered;
      wrapper.appendChild(copyBtn);

      const pre = block.parentElement;
      pre.innerHTML = '';
      pre.appendChild(wrapper);
      pre.classList.add('with-line-numbers');
    });

    // 테이블을 감싸는 div 삽입
    document.querySelectorAll('main table').forEach((table) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'responsive-table';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });



 const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('mobileSidebar');

  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      sidebar.style.left = '0';
    } else {
      sidebar.style.left = '-100%';
    }
  });



  // 모바일, PC 모두에 이벤트 연결
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const targetId = btn.getAttribute("data-target");
      const submenu = document.getElementById(targetId);

      if (submenu) {

        
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
        e.preventDefault(); // 메뉴 링크 이동 방지 (필요 시 제거)
      }
    });
  });

  const toggleAllButtons = document.querySelectorAll('.toggle-all-btn');

  toggleAllButtons.forEach(button => {
    let expanded = true; // 기본은 열림

    button.addEventListener('click', () => {
      const targetType = button.getAttribute('data-target-type');
      const submenus = document.querySelectorAll(`#${targetType}Sidebar .submenu`);

      expanded = !expanded;
      submenus.forEach(ul => {
        ul.style.display = expanded ? 'block' : 'none';
      });
    });
  });

  // 초기화: 모든 submenu 열어두기
  document.querySelectorAll('.submenu').forEach(ul => {
    ul.style.display = 'block';
  });



 const currentPath = decodeURIComponent(location.pathname.split('/').pop()); // 현재 파일명.html (디코딩)
  const allLinks = document.querySelectorAll('.sidebar a');

  allLinks.forEach(link => {
    const linkHref = decodeURIComponent(link.getAttribute('href') || '');
    if (linkHref.includes(currentPath)) {
      link.classList.add('active');

      // 상위 submenu 열기
      const submenu = link.closest('.submenu');
      if (submenu) submenu.style.display = 'block';
    }
  });

    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 250) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
 
    topBtn.addEventListener("click", function(e) {
        e.preventDefault();
        smoothScrollToTop(400);
    });
 
    function smoothScrollToTop(duration) {
        var start = window.scrollY;
        var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
 
        var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        var windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
        var destinationOffset = 0;
        var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
 
        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            return;
        }
 
        function scroll() {
            var now = 'now' in window.performance ? performance.now() : new Date().getTime();
            var time = Math.min(1, ((now - startTime) / duration));
            var timeFunction = (time * (2 - time));
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
 
            if (window.scrollY === destinationOffsetToScroll) {
                return;
            }
 
            requestAnimationFrame(scroll);
        }
 
        scroll();
    }
});

// 테이블을 감싸는 div 삽입
document.querySelectorAll('main table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'responsive-table';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
});


