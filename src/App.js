import { fetchDetailFiles, fetchFiles } from "./api/api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import FileList from "./components/FileList.js";
import Modal from "./components/Modal.js";

export default function App({ $target }) {
    this.state = {
        pathInfo: [
            {
                name: 'root',
                url: ''
            }
        ],
        files: [],
    }

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }
        fileListComponent.setState({
            files: this.state.files,
            isLoading: false,
        })
        breadcrumbComponent.setState({
            path: this.state.pathInfo,
        })

    }
    
    const breadcrumbComponent = new Breadcrumb({
        $target,
        initialState: {
            path: this.state.pathInfo,
        }
    })

    const fileListComponent = new FileList({
        $target,
        initialState: {
            files: [],
            isLoading: true,
        },
        onClick: async (id, pathInfo) => {
            fileListComponent.setState({
                isLoading: true,
            })
           
            if(pathInfo) {
                const res = await fetchDetailFiles(id);
                this.setState({
                    pathInfo: [...this.state.pathInfo, pathInfo],
                    files: res
                })
            } else {
                const newFileInfo = [...this.state.pathInfo];
                newFileInfo.pop();
                const res = await fetchDetailFiles(newFileInfo[newFileInfo.length - 1].url);
                this.setState({
                    pathInfo: newFileInfo,
                    files: res
                })
            }
        },
        modalOpen: (image) => {
            ModalComponent.setState({
                isLoading: true,
                image: ''
            });
            setTimeout(() => ModalComponent.setState({
                isLoading: false,
                image,
            }), 1000)
        }
    })

    const ModalComponent = new Modal({
        $target,
        initialState: {
            isLoading: true,
        }
    })


    this.getFiles = async () => {
        const res = await fetchFiles();
        this.setState({
            files: res
        })
    }

    this.getFiles();
}