import '@logseq/libs';
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user';
import { DOING, TODO, PLUGIN, DONE } from './constants';
import { handleSelectedBlocks } from './utils';


function getContentForNextState(b: BlockEntity): string {
  if (TODO.test(b.content)) {
    return b.content.replace(TODO, 'DOING ');
  } else if (DOING.test(b.content)) {
    return b.content.replace(DOING, 'DONE ');
  } else if (DONE.test(b.content)) {
    return b.content.replace(DONE, 'TODO ');
  } else{
    return `TODO ${b.content}`;
  }
}

async function makeBlockTodo(b: BlockEntity) {
  const content = getContentForNextState(b);
  await logseq.Editor.updateBlock(b.uuid, content)
}

function registerShortcuts() {
  logseq.App.registerCommandShortcut(
    {mode: "global", binding: "alt+j"},
    async () => handleSelectedBlocks(makeBlockTodo)
  );
}

async function main() {
  console.info(`${PLUGIN} MAIN`);
  registerShortcuts()
  console.info(`${PLUGIN} LOADED`);
}
logseq.ready(main).catch(console.error);