export default function Modal({ $target, initialState }) {
    const $component = document.createElement('div');
    this.state = initialState;
    
    $target.appendChild($component);
    
    this.render = () => {
        $component.style.display = 'block';
        if(this.state.isLoading) {
            $component.className = 'Modal Loading';
            $component.innerHTML = ` 
                <div class="content">
                    <img src="./assets/nyan-cat.gif">
                </div>
            `
        } else {
            $component.className = 'Modal ImageViewer';
            $component.innerHTML = ` 
                <div class="content">
                    <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${this.state.image}">
                </div>
            `
        }
    }

    this.remove = () => {
        // $target.removeChild($component);
        $component.style.display = 'none';
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        };
        this.render();
    }

    $component.addEventListener('click', (e) => {
        const $div = e.target.closest('div');

        if($div.className !== 'content') {
            this.remove();
        }
    })

    const keyEvent = window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            this.remove();
        }
    })
}