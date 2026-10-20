import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'

async function mount() {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  const script = html.match(/src="([^"]+\.js)"/)[1]
  const code = await readFile(new URL(`../dist${script}`, import.meta.url), 'utf8')
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost' })
  dom.window.eval(code)
  return dom
}
const tick = () => new Promise(resolve => setTimeout(resolve, 0))

test('counter increments, decrements, and resets', async () => {
  const dom = await mount()
  try {
    const doc = dom.window.document
    doc.querySelector('[aria-label="Increase count"]').click()
    await tick()
    assert.equal(doc.querySelector('.counter-value').textContent, '1')
    doc.querySelector('[aria-label="Decrease count"]').click()
    doc.querySelector('[aria-label="Decrease count"]').click()
    await tick()
    assert.equal(doc.querySelector('.counter-value').textContent, '-1')
    doc.querySelector('.reset-button').click()
    await tick()
    assert.equal(doc.querySelector('.counter-value').textContent, '0')
  } finally { dom.window.close() }
})

test('tasks can be added, completed, filtered, and removed', async () => {
  const dom = await mount()
  try {
    const doc = dom.window.document
    const input = doc.querySelector('#new-task')
    input.value = '  Ship my first Vue app  '
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
    doc.querySelector('form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
    await tick()
    assert.equal(doc.querySelectorAll('.task-list li').length, 4)
    assert.equal(input.value, '')
    doc.querySelector('.task-list li:last-child input').click()
    await tick()
    assert.equal(doc.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'), '50')
    const filters = [...doc.querySelectorAll('.filter-row button')]
    filters.find(button => button.textContent === 'Done').click()
    await tick()
    assert.equal(doc.querySelectorAll('.task-list li').length, 2)
    assert.match(doc.querySelector('.task-list').textContent, /Ship my first Vue app/)
    doc.querySelector('.task-list li:last-child .remove-button').click()
    await tick()
    assert.equal(doc.querySelectorAll('.task-list li').length, 1)
    filters.find(button => button.textContent === 'Active').click()
    await tick()
    assert.equal(doc.querySelectorAll('.task-list li').length, 2)
    assert.equal(doc.querySelectorAll('.task-list input:checked').length, 0)
    input.value = '   '
    input.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
    doc.querySelector('form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
    await tick()
    filters.find(button => button.textContent === 'All').click()
    await tick()
    assert.equal(doc.querySelectorAll('.task-list li').length, 3)
  } finally { dom.window.close() }
})
