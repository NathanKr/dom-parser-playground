import { expect, test } from "vitest";
import fs from 'fs';
import path from 'path'

test('DomParser wrong format',()=>{
    const parser = new DOMParser();
    const htmlString = `<body>
    
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>`
    const doc  = parser.parseFromString(htmlString,"text/html");
    // -- body element is not closed but it is working
    expect(doc.body.querySelectorAll('*').length).toBe(2);
})

test('DomParser read from html -> ok',()=>{
    const encoding = 'utf-8';
    const ynetFile = path.join('data','ynet','ynet-19-10-23.htm')
    const data = fs.readFileSync(ynetFile,encoding);
    expect(data).toBeTruthy()
    const parser = new DOMParser();
    const doc  = parser.parseFromString(data, "text/html");
    expect(doc).toBeTruthy();
    expect(doc.head).toBeTruthy();
    const titleElem = doc.head.querySelector('title');
    expect(titleElem?.textContent).toBe('ynet - חדשות, כלכלה, ספורט ובריאות - דיווחים שוטפים מהארץ ומהעולם')
    expect(doc.body).toBeTruthy();
})

test('DomParser simple - full html -> ok',()=>{
    const htmlString = ` <!DOCTYPE html>
    <html>
    <body>
    
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
    
    </body>
    </html> `

    const parser = new DOMParser();
    const doc  = parser.parseFromString(htmlString, "text/html");
    
    expect(doc.querySelectorAll('h1').length).toBe(1);
    expect(doc.querySelectorAll('p').length).toBe(1)
    expect(doc.querySelector('p')?.textContent).toBe('My first paragraph.')
    expect(doc.querySelector('h1')?.textContent).toBe('My First Heading')
})

test('DomParser simple - only body -> ok',()=>{
    const bodyString = `<body>
    
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
    
    </body>`

    const parser = new DOMParser();
    const doc  = parser.parseFromString(bodyString, "text/html");
    
    expect(doc.querySelectorAll('h1').length).toBe(1);
    expect(doc.querySelectorAll('p').length).toBe(1)
    expect(doc.querySelector('p')?.textContent).toBe('My first paragraph.')
    expect(doc.querySelector('h1')?.textContent).toBe('My First Heading')
})