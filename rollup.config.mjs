import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";

import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: [
    {
      name: "JDL",
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      name: "JDL",
      file: "dist/index.cjs.js",
      format: "cjs"
    }
  ],
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: true
    }),
    typescript(),
    babel({
      exclude: ["node_modules/**"],
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      presets: [["@babel/preset-env", { targets: { node: "12" } }]]
    }),
    terser(),
    del({ targets: "dist/*" })
  ],
  external: ["phin", "dayjs"]
};
