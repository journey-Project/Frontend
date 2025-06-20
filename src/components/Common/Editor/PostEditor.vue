<template>
  <div class="post-editor">
    <div class="custom-header">
      <div class="mode-toggle">
        <button :class="{ active: mode === 'write' }" @click="mode = 'write'">글쓰기</button>
        <button :class="{ active: mode === 'preview' }" @click="mode = 'preview'">미리보기</button>
      </div>
      <div class="toolbar-placeholder" ref="toolbarContainer" />
    </div>

    <div v-if="isReady" class="editor-wrapper">
      <div
        ref="editorRoot"
        class="editor-container"
        :style="{
          visibility: mode === 'write' ? 'visible' : 'hidden',
          position: mode === 'write' ? 'static' : 'absolute',
        }"
      />
      <div v-if="mode === 'write' && isEditorEmpty" class="editor-placeholder">
        내용을 입력해 주세요
      </div>

      <div
        class="preview-container"
        v-html="previewHtml"
        :style="{ display: mode === 'preview' ? 'block' : 'none' }"
      />
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, nextTick } from 'vue'
import Editor from '@toast-ui/editor'
import axios from 'axios'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const toolbarContainer = ref(null)
const editorRoot = ref(null)
let editorInstance = null
const isReady = ref(false)
const mode = ref('write')
const previewHtml = ref('')
const isEditorEmpty = ref(true)

onMounted(async () => {
  isReady.value = true
  await nextTick()

  if (!editorRoot.value) return

  editorInstance = new Editor({
    el: editorRoot.value,
    height: 'auto',
    initialEditType: 'wysiwyg',
    minHeight: '600px',
    previewStyle: 'vertical',
    initialValue: props.modelValue,
    language: 'ko',
    hideModeSwitch: true,
    usageStatistics: false,
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['ul', 'ol', 'task'],
      ['table', 'image', 'link'],
      ['code', 'codeblock', 'quote'],
    ],
    hooks: {
      change() {
        const html = editorInstance.getHTML()
        emit('update:modelValue', html)
        previewHtml.value = html
        checkEditorEmpty()
      },
      addImageBlobHook: async (blob, callback) => {
        try {
          const fd = new FormData()
          fd.append('file', blob)

          const { data } = await axios.post('https://journeysite.site/api/s3/application', fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })

          callback(data, blob.name)
        } catch (e) {
          alert('이미지 업로드 실패')
          console.error(e)
        }
      },
    },
  })

  requestAnimationFrame(() => {
    const toolbarEl = editorRoot.value?.querySelector('.toastui-editor-toolbar')
    if (toolbarEl && toolbarContainer.value) {
      toolbarContainer.value.appendChild(toolbarEl)
      window.dispatchEvent(new Event('resize'))
    }
  })
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorInstance) {
      const currentContent = editorInstance.getHTML()
      if (newVal !== currentContent) {
        editorInstance.setHTML(newVal || '')
        previewHtml.value = newVal || ''
        checkEditorEmpty()
      }
    }
  },
)

function checkEditorEmpty() {
  const html = editorInstance?.getHTML()?.trim()
  isEditorEmpty.value = !html || html === '<p><br></p>' || html === '<p></p>'
}

function getContent() {
  return editorInstance?.getHTML() || ''
}
watch(mode, async (newMode) => {
  if (newMode === 'write') {
    await nextTick()

    const toolbarEl = editorRoot.value?.querySelector('.toastui-editor-toolbar')
    if (toolbarEl && toolbarContainer.value && !toolbarContainer.value.contains(toolbarEl)) {
      toolbarContainer.value.appendChild(toolbarEl)
    }

    editorInstance?.layout?.()
  }
})
defineExpose({ getContent })
</script>

<style scoped>
.post-editor {
  border: 2px solid var(--color-primary);
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: white;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background: #fff;
  border-bottom: 1px solid var(--color-primary);
  position: relative;
  z-index: 50;
  overflow: visible;
}

.mode-toggle {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  align-items: center;
  white-space: nowrap;
}

.mode-toggle button {
  background: #fff;
  border: 1px solid var(--color-surface);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  margin-right: 0.25rem;
  transition: background 0.2s;
}

.mode-toggle button.active {
  background: var(--color-surface);
  color: var(--color-primary);
}

.toolbar-placeholder {
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: center;
  background: #fff;
  padding: 0rem 1rem;
  width: 100%;
  transform: none;
  min-width: 0;
  z-index: 999;
}

:deep(.toastui-editor-toolbar) {
  display: flex !important;
  flex-wrap: nowrap !important;
  width: 100% !important;
  gap: 0.5rem;
  overflow: visible !important;
}

:deep(.toastui-editor-more) {
  display: none !important;
}

:deep(.toastui-editor-toolbar),
:deep(.toastui-editor-toolbar-group),
:deep(.toastui-editor-toolbar-divider),
:deep(.toastui-editor-defaultUI-toolbar) {
  background: #fff !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.toastui-editor-toolbar-group) {
  display: flex !important;
  flex-shrink: 0 !important;
  gap: 0.25rem;
  align-items: center;
  padding: 0 !important;
}

:deep(button.more.toastui-editor-toolbar-icons) {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  visibility: hidden !important;
}

:deep(.toastui-editor-toolbar button svg) {
  stroke: var(--color-primary) !important;
  fill: var(--color-primary) !important;
}

:deep(.toastui-editor-toolbar button) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.toastui-editor-toolbar-divider),
:deep(.toastui-editor-dropdown-toolbar),
:deep(.toastui-editor-more) {
  display: none !important;
}
.editor-container :deep(.toastui-editor-defaultUI-toolbar) {
  display: none !important;
}

:deep(.toastui-editor-toolbar) {
  display: flex !important;
  justify-content: flex-end !important;
  flex-wrap: nowrap !important;
  gap: 0.5rem;
  width: 100% !important;
  overflow: visible !important;
}

:deep(.toastui-editor-toolbar-group) {
  display: flex !important;
  flex-shrink: 0 !important;
  gap: 0.25rem;
  align-items: center;
  flex-wrap: nowrap !important;
  background: transparent !important;
  padding: 0 !important;
}
.editor-container :deep(.toastui-editor-defaultUI) {
  font-family: 'Pretendard', sans-serif;
  border: none;
  background: white;
  z-index: 1;
}

:deep(.toastui-editor-contents) {
  padding: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  background: white !important;
  position: relative;
}

:deep(button.toastui-editor-toolbar-icons > svg) {
  display: block !important;
  position: relative;
  z-index: 1;
}

:deep(button.toastui-editor-toolbar-icons > span) {
  display: none !important;
}

:deep(button.toastui-editor-toolbar-icons:focus) {
  outline: none !important;
  box-shadow: none !important;
}

:deep(.toastui-editor-contents) {
  caret-color: var(--color-primary);
}

:deep(button.toastui-editor-toolbar-icons)::after {
  display: none !important;
}

:deep(.toastui-editor-toolbar-group)::before {
  content: none !important;
  display: none !important;
}
:deep(button.toastui-editor-toolbar-icons) {
  width: 32px !important;
  height: 32px !important;
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  caret-color: transparent !important;
  color: var(--color-primary) !important;
}

:deep(button.toastui-editor-toolbar-icons:focus),
:deep(button.toastui-editor-toolbar-icons:focus-visible),
:deep(button.toastui-editor-toolbar-icons:active) {
  outline: none !important;
  box-shadow: none !important;
  caret-color: transparent !important;
}

:deep(button.toastui-editor-toolbar-icons)::after {
  display: none !important;
  content: none !important;
}

.preview-container {
  height: auto;
  min-height: 600px;
  /* padding: 1.5rem; */
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  background-color: white;
}
.preview-container img {
  max-width: 100%;
  height: auto;
}

:deep(.placeholder.ProseMirror) {
  color: #fff;
}

.ProseMirror .placeholder {
  color: #fff;
}

.editor-wrapper {
  position: relative;
}

.editor-placeholder {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  color: var(--color-gray-400, #999);
  font-size: 1rem;
  pointer-events: none;
  z-index: 2;
}

.preview-container {
  min-height: 600px;
  background: white;
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  word-break: break-word;
  padding: 1.5rem;
}

/* heading */
.preview-container h1,
.preview-container h2,
.preview-container h3,
.preview-container h4,
.preview-container h5,
.preview-container h6 {
  font-weight: bold;
  margin: 1.5rem 0 1rem;
  line-height: 1.5;
}

/* paragraph */
.preview-container p {
  margin: 1rem 0;
}

/* list */
.preview-container ul,
.preview-container ol {
  padding-left: 2rem;
  margin: 1rem 0;
}

.preview-container li {
  margin: 0.25rem 0;
}

/* blockquote */
.preview-container blockquote {
  margin: 1rem 0;
  padding-left: 1rem;
  border-left: 4px solid #ddd;
  color: #666;
  font-style: italic;
}

/* code block */
.preview-container pre {
  background: #f5f5f5;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  border-radius: 4px;
  margin: 1rem 0;
}

/* inline code */
.preview-container code {
  background: #eee;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

/* table */
.preview-container table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.95rem;
}

.preview-container th,
.preview-container td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

/* image */
.preview-container img {
  max-width: 100%;
  height: auto;
}
</style>
