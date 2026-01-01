# npm 배포 + Neovim 연동 가이드

## npm 배포 준비
1) `package.json` 정리
   - `"private": false` 로 바꾸고, 고유한 `"name"`/`"version"` 지정.
   - `bin` 그대로(`"dubelsik": "dist/cli.js"`) 유지.
   - `"files"` 추가: `["dist", "package.json", "README.md", "LICENSE"]` 등 배포물만 포함.
   - `prepublishOnly` 스크립트 추가: `"prepublishOnly": "npm run build"`.
2) 타입/빌드 체크
   - `npm test`
   - `npm run build`
   - `npm pack --dry-run` 으로 포함 파일 확인.
3) 퍼블리시
   - `npm login`
   - 스코프 패키지면 `npm publish --access public`, 아니면 `npm publish`.

## 전역 설치 후 Neovim 연동
1) 전역 설치(또는 개발 중이면 `npm link`)
   - `npm i -g <패키지명>` 또는 `npm link` (로컬)
2) Neovim Lua 키맵 예시 (비주얼 선택 변환)
   - `init.lua` 등에 추가:
```lua
local function dubelsik_visual()
  local bufnr = vim.api.nvim_get_current_buf()
  local srow, scol = vim.fn.getpos("'<")[2] - 1, vim.fn.getpos("'<")[3] - 1
  local erow, ecol = vim.fn.getpos("'>")[2] - 1, vim.fn.getpos("'>")[3]
  local lines = vim.api.nvim_buf_get_text(bufnr, srow, scol, erow, ecol, {})
  local input = table.concat(lines, "\n")
  local res = vim.system({ "dubelsik", input }, { stdout = true }):wait()
  if res.code ~= 0 then
    vim.notify("dubelsik failed: " .. (res.stderr or ""), vim.log.levels.ERROR)
    return
  end
  local output = res.stdout:gsub("%s+$", "")
  local new_lines = {}
  for s in output:gmatch("([^\n]*)\n?") do
    table.insert(new_lines, s)
  end
  if #new_lines > 0 and new_lines[#new_lines] == "" then
    table.remove(new_lines)
  end
  vim.api.nvim_buf_set_text(bufnr, srow, scol, erow, ecol, new_lines)
end

vim.keymap.set("v", "<leader>du", dubelsik_visual, { desc = "Convert selection with dubelsik" })
```
3) 확인
   - 비주얼 선택 → `<leader>du` → 한글 변환.
   - 문제 시 PATH에 `dubelsik` 존재 여부, CLI 실행 확인(`dubelsik --help`).
