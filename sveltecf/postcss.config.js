import OpenProps from 'open-props';
import postcssJitProps from 'postcss-jit-props';

const config = {
    plugins: [postcssJitProps(OpenProps)],
};

export default config;
