const apiProps = {
    host: "http://localhost:5502/devPreview/src/fakeapi"
}


export const getPrice = async ({ type, parameter }) => {

    let loading = true;
    let result;
    let error;

    const fetchData = async (urlWithQuery) => {
        return await fetch(urlWithQuery)
            .then(data => {
                return data.json();
            })
            .then(data => {
                loading = !loading;
                result = data;
            })
            .catch(err => {
                console.error(err);
                error = err;
                loading = !loading;
            })
    }

    switch (type) {
        case "PRICE_SELF_ADHESIVE":
            await fetchData(`${apiProps.host}/print_selfadhesive.json`)
            return { loading, result, error };
        case "PRICE_PLOTTER_CUT":
            await fetchData(`${apiProps.host}/cut_plotter.json`)
            return { loading, result, error };
    }

    return { loading, result, error }
}