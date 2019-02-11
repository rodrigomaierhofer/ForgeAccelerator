function teste() {
    
    setSettings();
}

function setMeter() {
    var measureExtension = NOP_VIEWER.getExtension('Autodesk.Measure')
    measureExtension.setUnits('m')

}

function setSettings() {
    // Make sure that the loaded document's setting won't
    // override it and change it to something else
    NOP_VIEWER.prefs.tag('ignore-producer');
    NOP_VIEWER.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onSelectionBinded)

    NOP_VIEWER.setDisplayEdges(false)
    NOP_VIEWER.setEnvMapBackground(0)
    NOP_VIEWER.setGroundReflection(false)
    NOP_VIEWER.setGroundShadow(false)
    NOP_VIEWER.setLightPreset(0)
    NOP_VIEWER.setOptimizeNavigation(true)
    //NOP_VIEWER.setReverseHorizontalLookDirection(true);
    //NOP_VIEWER.setReverseVerticalLookDirection(true);
    NOP_VIEWER.setReverseZoomDirection(true)

}