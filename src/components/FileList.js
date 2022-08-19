export default function FileList({ $target, initialState, onClick, modalOpen }) {
    const $component = document.createElement('div');
    $component.className = 'Nodes';
    this.state = initialState;
    $target.appendChild($component);

    this.render = () => {
        if(this.state.isLoading) {
            $component.innerHTML = `...로딩중`
        } else {
            $component.innerHTML = `
                ${this.state.files.length === 0 || this.state.files.some(item => item.parent) ? `
                    <div class="Node">
                        <img src="./assets/prev.png">
                    </div>
                ` 
                : ''
                }
                ${this.state.files.map(file => `
                        <div class="Node" data-file-id="${file.id}" data-file-name="${file.name}" data-file-type="${file.type}" data-file-path="${file.filePath}">
                            <img src=${file.type === 'FILE' ? "./assets/file.png" : "./assets/directory.png" }>
                            <div>${file.name}</div>
                        </div>
                        `).join('')}
                    `
                }
            `
        `
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        };
        this.render();
    }

    $component.addEventListener('click', (e) => {
        const $div = e.target.closest('.Node');
        
        if($div) {
            const { fileId, fileName, fileType, filePath } = $div.dataset;
            if(fileType === 'FILE') {
                modalOpen(filePath)
            } else {
                onClick(fileId, fileName ? { name: fileName, url: fileId } : null )
            }
        } 
    })

    this.render();
}