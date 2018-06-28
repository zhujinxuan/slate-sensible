/* eslint-disable import/no-extraneous-dependencies */
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

const resizeEvent = dom.window.document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(resizeEvent);
};
