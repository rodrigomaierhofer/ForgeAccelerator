var viewerApp;

var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',
    // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: function (onGetAccessToken) {

        //TODO: verificar se deveria ter usado promise
        getForgeToken(
            (res) => {
                var accessToken = res.data.access_token;
                var expireTimeSeconds = res.data.expires_in;
                onGetAccessToken(accessToken, expireTimeSeconds);
            }
        )

       
    }

};


var documentId = 'urn:<YOUR_URN_ID>';

function startViewer() {

    Autodesk.Viewing.Initializer(options, function onInitialized() {
        console.log("entrou no vieweign initializer");
        console.log(documentId);
        viewerApp = new Autodesk.Viewing.ViewingApplication('MyViewerDiv');
        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
        viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
function onDocumentLoadSuccess(doc) {

    // We could still make use of Document.getSubItemsWithProperties()
    // However, when using a ViewingApplication, we have access to the **bubble** attribute,
    // which references the root node of a graph that wraps each object from the Manifest JSON.
    var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    // Choose any of the avialble viewables
    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
    console.log('onItemLoadSuccess()!');
    console.log(viewer);
    console.log(item);

    // Congratulations! The viewer is now ready to be used.
    console.log('Viewers are equal: ' + (viewer === viewerApp.getCurrentViewer()));
}

function onItemLoadFail(errorCode) {
    console.error('onItemLoadFail() - errorCode:' + errorCode);
}
