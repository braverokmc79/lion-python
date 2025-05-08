const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

// 마크다운 렌더러 설정
const md = new MarkdownIt({
  highlight: function (str, lang) {
    lang = 'python'; // 강제로 파이썬만 적용
    if (hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs language-${lang}">` +
               hljs.highlight(str, { language: lang }).value +
               `</code></pre>`;
      } catch (_) {}
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

// HTML 템플릿
function wrapWithHtml(content, title) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
  <style>
    body {
      max-width: 800px;
      margin: auto;
      padding: 2rem;
      font-family:"Noto Sans KR", sans-serif;
      line-height: 1.6;      
      font-optical-sizing: auto;
      font-weight: 400;
      font-style: normal;
    }
    pre {
      overflow-x: auto;
      padding: 1rem;
      border-radius: 10px;
    }
  </style>
</head>
<body>
${content}
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
</body>
</html>`;
}

// 재귀적으로 디렉토리 순회하며 md 파일 찾기
function getAllMarkdownFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

// 변환 실행
const mdFiles = getAllMarkdownFiles(process.cwd());
mdFiles.forEach(mdFile => {
  const mdContent = fs.readFileSync(mdFile, 'utf8');
  const htmlContent = md.render(mdContent);
  const wrappedHtml = wrapWithHtml(htmlContent, path.basename(mdFile));
  const outputFile = mdFile.replace(/\.md$/, '.html');
  fs.writeFileSync(outputFile, wrappedHtml);
  console.log(`✅ 변환됨: ${mdFile} → ${outputFile}`);
});
