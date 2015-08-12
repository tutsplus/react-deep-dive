import alt from './alt';

class HarActions {

    loadUrl(url) {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dispatch(data)
            });
    }

    loadHar(har) {
        this.dispatch(har);
    }
}

export default alt.createActions(HarActions);