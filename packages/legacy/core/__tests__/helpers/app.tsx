import React, { PropsWithChildren, useMemo } from 'react'
import { NetworkContext } from '../../App/contexts/network'

import networkContext from '../contexts/network'
import { Container, ContainerProvider } from '../../App/container-api'
import { MainContainer } from '../../App/container-impl'
import { container } from 'tsyringe'
import { OpenIDCredentialRecordProvider } from '../../App/modules/openid/context/OpenIDCredentialRecordProvider'

export const BasicAppContext: React.FC<PropsWithChildren> = ({ children }) => {
  const context = useMemo(() => new MainContainer(container.createChildContainer()).init(), [])
  return (
    <ContainerProvider value={context}>
      <OpenIDCredentialRecordProvider>
        <NetworkContext.Provider value={networkContext}>{children}</NetworkContext.Provider>
      </OpenIDCredentialRecordProvider>
    </ContainerProvider>
  )
}

interface CustomBasicAppContextProps extends PropsWithChildren {
  container: Container
}
export const CustomBasicAppContext: React.FC<CustomBasicAppContextProps> = ({ children, container }) => {
  const context = container
  return (
    <ContainerProvider value={context}>
      <NetworkContext.Provider value={networkContext}>{children}</NetworkContext.Provider>
    </ContainerProvider>
  )
}