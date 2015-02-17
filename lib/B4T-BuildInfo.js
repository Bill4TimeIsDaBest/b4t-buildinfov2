var path = require('path');

module.exports = function() {
    var BuildInfo = {
        _jsFiles: [],
        _artifactFiles: [],
        _jobName: '',
        _buildNumber: '',
        _buildId: '',
        _buildType: '',
        _buildPathRoot: '',
        _buildPath: '',
        _codeDropPath: '',
        _workspacePath: '',
        _outputArtifactName: '',

        get jsFiles() {
            return this._jsFiles;
        },
        set jsFiles(newJSFiles) {
            this._jsFiles = newJSFiles;
            return this;
        },
        //----------------------------------------
        get artifactFiles() {
            return this._artifactFiles;
        },
        set artifactFiles(newArtifactFiles) {
            this._artifactFiles = newArtifactFiles;
            return this;
        },
        //----------------------------------------
        get jobName() {
            return this._jobName;
        },
        set jobName(newJobName) {
            this._jobName = newJobName.replace(/\//g, '-').replace(/\./g, '-').replace(/\s+/g, '-');
            return this;
        },
        //----------------------------------------
        get buildNumber() {
            return this._buildNumber;
        },
        set buildNumber(newBuildNumber) {
            this._buildNumber = newBuildNumber;
            return this;
        },
        //----------------------------------------
        get buildId() {
            return this._buildId;
        },
        set buildId(newBuildId) {
            this._buildId = newBuildId;
            return this;
        },
        //----------------------------------------
        get buildType() {
            return this._buildType;
        },
        set buildType(newBuildType) {
            this._buildType = newBuildType.toLowerCase();
            return this;
        },
        //----------------------------------------
        get buildPathRoot() {
            return this._buildPathRoot;
        },
        set buildPathRoot(newBuildPathRoot) {
            this._buildPathRoot = newBuildPathRoot;
            return this;
        },
        //----------------------------------------
        get buildPath() {
            return this._buildPath;
        },
        set buildPath(newBuildPath) {
            this._buildPath = newBuildPath;
            return this;
        },
        //----------------------------------------
        get codeDropPath() {
            return this._codeDropPath;
        },
        set codeDropPath(newCodeDropPath) {
            this._codeDropPath = newCodeDropPath;
            return this;
        },
        //----------------------------------------
        get workspacePath() {
            return this._workspacePath;
        },
        set workspacePath(newWorkSpacePath) {
            this._workspacePath = newWorkSpacePath;
            return this;
        },
        //----------------------------------------
        get outputArtifactName() {
            return this._outputArtifactName;
        },
        set outputArtifactName(newOutputArtifactName) {
            this._outputArtifactName = newOutputArtifactName;
            return this;
        },
    };

    BuildInfo.jsFiles = ['*.js', 'bin/**/*', 'public/**/*.js','routers/**/*.js','routes/**/*.js'];
    BuildInfo.artifactFiles = ['server.js','web.config','package.json','bin/**/*','public/**/*','routers/**/*','routes/**/*']; 
    BuildInfo.jobName = (typeof(process.env.JOB_NAME) != 'undefined' ? process.env.JOB_NAME : 'DEFAULT_GRUNT_BUILD_NAME');
    BuildInfo.buildNumber = (process.env.BUILD_NUMBER || '000');
    BuildInfo.buildId = (process.env.BUILD_ID || '0000-00-00-00');
    BuildInfo.buildType = (process.env.TARGET || 'No_Target_Provided');
    BuildInfo.buildPathRoot = path.join('c:', 'builds', BuildInfo.jobName);
    BuildInfo.buildPath = path.join(BuildInfo.buildPathRoot, BuildInfo.buildNumber, BuildInfo.buildType);
    BuildInfo.codeDropPath = path.join('c:', 'codeDrop', BuildInfo.jobName, BuildInfo.buildNumber);
    BuildInfo.workspacePath = __dirname;
    BuildInfo.outputArtifactName = ''.concat(BuildInfo.jobName, '_', BuildInfo.buildId, '_', BuildInfo.buildNumber, '_', BuildInfo.buildType);

    return BuildInfo;
}();