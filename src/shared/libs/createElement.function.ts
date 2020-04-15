export function createElement<T extends HTMLElement>(name: string, classNames: string | Array<string>): T{
    const element = document.createElement(name) as T;
    if (Array.isArray(classNames)){
        element.className = classNames.join(" ");
        return element;
    } 
    element.className = classNames;

    return element;
}