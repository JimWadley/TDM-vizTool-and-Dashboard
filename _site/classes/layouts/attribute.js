class Attribute {
    constructor(data) {
        this.aCode = data.aCode;
        this.aDisplayName = data.aDisplayName || null;
        this.agWeightCode = data.agWeightCode || null;
        this.agWeightCodeFilter = data.agWeightCodeFilter || null;
        this.rendererCollection = data.rendererCollection ? new RendererCollection(data.rendererCollection) : null;
    }
}