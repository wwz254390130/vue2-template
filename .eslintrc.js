module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],

    rules: {
        'vue/html-end-tags': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 统一换行符，'\n' unix(for LF) and '\r\n' for windows(CRLF)，默认unix
        // off或0: 禁用规则
        'linebreak-style': 'off',
        // 只有一个export时不需要加default
        'import/prefer-default-export': 'off',
        // 强制方法必须返回值，TypeScript强类型，不配置
        'consistent-return': 'off',
        // 强制一行的最大长度
        'max-len': 'off',
        // 赋值给声明为函数参数的变量
        'no-param-reassign': 'off',
        // 对程序状态没有影响的未使用表达式表示逻辑错误
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        // 单引号，允许字符串使用反引号
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        // 不强制使用解构
        'prefer-destructuring': 'off',
        // 不强制使用模板文字
        'prefer-template': 'off',
        // 代码缩进风格
        indent: [2, 4],
        // 取消对文件扩展名的验证
        'import/extensions': 'off',
        // 取消自动解析路径，以此开启alias的别名路径设置
        'import/no-unresolved': 'off',
    },

    parserOptions: {
        parser: 'babel-eslint',
    },

    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
};
