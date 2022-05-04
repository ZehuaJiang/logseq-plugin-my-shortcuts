import '@logseq/libs';
import { logseq as curPlugin } from '../package.json'
const pluginId: string = curPlugin.id

function makeTodoContent(content: string): string {
  let stripTodoContent = /^TODO\s+/.test(content)
    ? content.replace(/^TODO\s+/, '')
    : content;
  return `TODO ${stripTodoContent}`;
}

async function makeTodo() {
  const selected = await logseq.Editor.getSelectedBlocks();
  if (selected && selected.length > 1) {
    for (let block of selected) {
      await logseq.Editor.updateBlock(
        block.uuid,
        makeTodoContent(block.content)
      );
    }
  } else {
    const block = await logseq.Editor.getCurrentBlock();
    if (block?.uuid) {
      await logseq.Editor.updateBlock(
        block.uuid,
        makeTodoContent(block.content)
      );
    }
  }
}

async function main() {
  console.info(`${pluginId} MAIN`);
  logseq.App.registerCommandPalette(
    {
      key: `todo`,
      label: `shortcut for todo`,
      keybinding: {
        mode: 'global',
        binding: 'mod+l',
      },
    },
    async () => {
      await makeTodo();
    }
  );
  console.info(`${pluginId} LOADED`);
}
logseq.ready(main).catch(console.error);