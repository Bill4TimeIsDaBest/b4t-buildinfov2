var path = require('path');

module.exports = function() {
    var BuildInfo = {
        _artifact_files: [],
        _build_number: '',
        _build_type: '',
        _build_path_root: '',
        _build_path: '',
        _code_drop_path: '',
        _jenkins_job_name: '',
        _job_name: '',
        _js_files: [],
        _output_artifact_name: '',
        _workspace_path: '',

        //----------------------------------------
        get artifactFiles() {
            return this._artifact_files;
        },
        set artifactFiles(new_artifact_files) {
            this._artifact_files = new_artifact_files;
            return this;
        },
        //----------------------------------------
        get buildNumber() {
            return this._build_number;
        },
        set buildNumber(new_build_number) {
            this._build_number = new_build_number;
            return this;
        },
        //----------------------------------------
        get buildType() {
            return this._build_type;
        },
        set buildType(new_build_type) {
            this._build_type = new_build_type.toLowerCase();
            return this;
        },
        //----------------------------------------
        get buildPathRoot() {
            return this._build_path_root;
        },
        set buildPathRoot(new_build_path_root) {
            this._build_path_root = new_build_path_root;
            return this;
        },
        //----------------------------------------
        get buildPath() {
            return this._build_path;
        },
        set buildPath(new_build_path) {
            this._build_path = new_build_path;
            return this;
        },
        //----------------------------------------
        get codeDropPath() {
            return this._code_drop_path;
        },
        set codeDropPath(new_code_drop_path) {
            this._code_drop_path = new_code_drop_path;
            return this;
        },
        //----------------------------------------
        /**
         * [jenkinsJobName Jenkins provides job names using the '/' character 
         * because of this it creates issues when trying to process the actual
         * job name itself. In order to cope with this you can retrieve the
         * jenkins job name via this getter. This also replaces '.' and spaces
         * with the '-' ]
         * @return {[ String ]} [ The Jenkins job name, EX: Website/Build/Production]
         */
        get jenkinsJobName() {
            return this._job_name;
        },
        set jenkinsJobName(new_jenkins_job_name) {
            new_jenkins_job_name = new_jenkins_job_name.replace(/\./g, '-').replace(/\s+/g, '-');
            this._jenkins_job_name = new_jenkins_job_name;
            return this;
        },
        //----------------------------------------
        /**
         * [jobName The job name needs to be a single word that reflects the job
         * being build. Because Jenkins provides JOB_NAME as a path with the '/'
         * this accounts for that and only retrieves the root of the job path. 
         * It also replaces '.' and spaces with '-' ]
         * @return {[ String ]} [ The Jenkins job name, EX: Website/Build/Production]
         */
        get jobName() {
            return this._job_name;
        },
        set jobName(new_job_name) {
            new_job_name = new_job_name.replace(/\./g, '-').replace(/\s+/g, '-');
            this._job_name = new_job_name.split('/')[0];
            return this;
        },
        //----------------------------------------
        get jsFiles() {
            return this._js_files;
        },
        set jsFiles(new_js_files) {
            this._js_files = new_js_files;
            return this;
        },
        //----------------------------------------
        get outputArtifactName() {
            return this._output_artifact_name;
        },
        set outputArtifactName(new_output_artifact_name) {
            this._output_artifact_name = new_output_artifact_name;
            return this;
        },
        //----------------------------------------
        get workspacePath() {
            return this._workspace_path;
        },
        set workspacePath(new_workspace_path) {
            this._workspace_path = new_workspace_path;
            return this;
        },
    };

    BuildInfo.artifactFiles = ['server.js', 'web.config', 'package.json', 'bin/**/*', 'public/**/*', 'routers/**/*', 'routes/**/*'];
    BuildInfo.buildNumber = (process.env.BAMBOO_buildNumber || process.env.BUILD_NUMBER || '000');
    BuildInfo.buildType = (process.env.TARGET || 'No_Target_Provided');
    BuildInfo.jenkinsJobName = process.env.BAMBOO_planKey || process.env.JOB_NAME || 'DEFAULT_GRUNT_BUILD_NAME/Build/development';
    BuildInfo.jobName = BuildInfo.jenkinsJobName;
    BuildInfo.jsFiles = ['*.js', 'bin/**/*', 'public/**/*.js', 'routers/**/*.js', 'routes/**/*.js'];
    BuildInfo.workspacePath = __dirname;
    // These happen last because they rely on the other variables being configured
    BuildInfo.buildPathRoot = path.join('c:', 'builds', BuildInfo.jobName);
    BuildInfo.buildPath = path.join(BuildInfo.buildPathRoot, BuildInfo.buildNumber, BuildInfo.buildType);
    BuildInfo.codeDropPath = path.join('c:', 'codeDrop', BuildInfo.jobName, BuildInfo.buildNumber);
    BuildInfo.outputArtifactName = ''.concat(BuildInfo.jobName, '_', BuildInfo.buildNumber, '_', BuildInfo.buildType);

    return BuildInfo;
}();
