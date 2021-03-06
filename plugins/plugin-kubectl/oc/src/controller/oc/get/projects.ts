/*
 * Copyright 2020 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Arguments, Registrar } from '@kui-shell/core'
import { defaultFlags, KubeOptions, commandPrefix, doGet, getNamespacesTransformer } from '@kui-shell/plugin-kubectl'

/** Actuate a project switch by using `oc project set` */
function doSwitchViaOc(ns: string, args: Arguments<KubeOptions>) {
  return args.REPL.pexec(`oc project ${args.REPL.encodeComponent(ns)}`)
}

// we use the fetcher from 'kubectl get', and the viewTransformer from 'kubectl get namespaces'
export default function registerOcProjectGet(registrar: Registrar) {
  const viewTransformer = getNamespacesTransformer.bind(undefined, doSwitchViaOc)

  registrar.listen(
    `/${commandPrefix}/oc/get/project`,
    doGet('oc'),
    Object.assign({}, defaultFlags, { viewTransformer })
  )
  registrar.listen(
    `/${commandPrefix}/oc/get/projects`,
    doGet('oc'),
    Object.assign({}, defaultFlags, { viewTransformer })
  )
}
