import * as webpack from "webpack";
import * as path from "path";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

import { Dll, WebpackConfigBuilder } from "webpack-typescript-builder";

import { tempDir, wwwrootDir, noderootDir } from "./common";
import plugins from "./plugins";

const vendorsName = "_vendors";

export const vendorsDll = new Dll(vendorsName, "umd", tempDir);
export const serverVendorsDll = new Dll(vendorsName, "commonjs2", tempDir);

const entry: webpack.Entry = {};
entry[vendorsName] = ["./src/app/vendors"]

const configBuilder = new WebpackConfigBuilder(entry);

const clientConfig = configBuilder.toUmdConfig(wwwrootDir, ...plugins, vendorsDll.produce());
const serverConfig = configBuilder.toServerConfig(noderootDir, ...plugins, serverVendorsDll.produce());

export default [clientConfig, serverConfig];