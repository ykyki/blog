import OpenProps from 'open-props';
import postcssJitProps from 'postcss-jit-props';

export const plugins = [postcssJitProps(OpenProps)];
