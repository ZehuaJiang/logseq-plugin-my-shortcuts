import "@logseq/libs"
import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
export declare type oneBlockHandler = (b: BlockEntity) => Promise<void>;

export async function handleSelectedBlocks(handle: oneBlockHandler) {
    const selected = await logseq.Editor.getSelectedBlocks();
    if (selected && selected.length > 1) {
        for (let block of selected) {
            await handle(block);
        }
    } else {
        const block = await logseq.Editor.getCurrentBlock();
        if (block?.uuid) {
            await handle(block);
        }
    }
}