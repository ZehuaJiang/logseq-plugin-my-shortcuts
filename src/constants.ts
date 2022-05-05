import "@logseq/libs"
import { logseq as curPlugin } from '../package.json'

export const TODO = /^TODO\s+/; 
export const DOING = /^DOING\s+/; 
export const DONE = /^DONE\s+/; 
export const PLUGIN: string = curPlugin.id