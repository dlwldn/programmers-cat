export default function Breadcrumb({ $target, initialState }) {
    const $component = document.createElement('nav');
    $component.className = 'Breadcrumb';
    this.state = initialState;
    $target.appendChild($component);

    this.render = () => {
        $component.innerHTML = `
            ${this.state.path.map(item => `
                <div>${item.name}</div>
            `).join('')}
        `
    }   
 
    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    }

    this.render();
}