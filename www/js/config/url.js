/*
 * 用于管理不同环境下的模块路径
 */

var devPath = 'http://127.0.0.1:5002/'; //测试环境的路径
var proPath = 'http://10.10.68.252/';                       //正式环境的路径

var env = {

    //选择环境
    get: 'dev',
    //测试环境
    dev: {

        'login': {     //登录
            'login': devPath + 'cgi-bin/login.do'
        },

        'project': {   //选择当前项目
            'project': devPath + 'cgi-bin/project.do'
        },

        'model': {    //项目模块
            'model': devPath + 'cgi-bin/model.do',
            'case': devPath + 'cgi-bin/case.do',
            'result': devPath + 'cgi-bin/result.do'
        },

        'case_model': {   //用例模版
            'case_model': devPath + 'cgi-bin/case_model.do',
            'upload': devPath + 'cgi-bin/upload.do',
            'download': devPath + 'cgi-bin/out.do'
        },

        'setting': {    //高级设置
            'setting': devPath + 'cgi-bin/setting.do'
        }


    },
    //生产环境
    pro: {
        'login': {     //登录
            'login': proPath + 'cgi-bin/login.do'
        },

        'project': {   //选择当前项目
            'project': proPath + 'cgi-bin/project.do'
        },

        'model': {    //项目模块
            'model': proPath + 'cgi-bin/model.do',
            'case': proPath + 'cgi-bin/case.do',
            'result': proPath + 'cgi-bin/result.do'
        },

        'case_model': {   //用例模版
            'case_model': proPath + 'cgi-bin/case_model.do',
            'upload': proPath + 'cgi-bin/upload.do',
            'download': proPath + 'cgi-bin/out.do'
        },

        'setting': {    //高级设置
            'setting': proPath + 'cgi-bin/setting.do'
        }
    }
};