import React, { useEffect, useState } from 'react'
import { ViewManifestData } from '../../Utils/API/API_Requests'
import { manifestResponseInterface } from './types'

export default function ManifestDataPanel() {
  const [manifestData, setManifestData] = useState<manifestResponseInterface>(null)

  useEffect(() => {
    const fetchManifestData = async () => {
      const result = await ViewManifestData()
      setManifestData(result)
    }
    fetchManifestData()
  })

  const successful = manifestData?.Response?.manifestVersion?.update_successful ? 'true' : 'false'

  return (
    <section className='admin-data-wrapper'>
      <h2>Manifest data:</h2>
      <div>
        <div className={`admin-manifest-grid`}>
          <div className={'admin-item-title'}>Message: </div>
          <div>{manifestData && manifestData.message}</div>
          <div className={'admin-item-title'}>Current revision: </div>
          <div>
            {manifestData ? manifestData.Response.manifestVersion.current_revision : 'Loading...'}
          </div>
          <div className={'admin-item-title'}>Current version: </div>
          <div>
            {manifestData ? manifestData.Response.manifestVersion.current_version : 'Loading...'}
          </div>
          <div className={'admin-item-title'}>Updated: </div>
          <div>
            {manifestData ? manifestData.Response.manifestVersion.update_date : 'Loading...'}
          </div>
          <div className={'admin-item-title'}>Update type: </div>
          <div>
            {manifestData ? manifestData.Response.manifestVersion.update_type : 'Loading...'}
          </div>
          {/* eslint-disable no-nested-ternary */}
          <div className={'admin-item-title'}>Update successful: </div>
          <div>
            {manifestData
              ? successful
              : 'Loading...'}
          </div>
          {/* eslint-enable no-nested-ternary */}
          <div className={'admin-item-title'}>Number of items: </div>
          <div>{manifestData ? manifestData.Response.manifestData.items : 'Loading...'}</div>
          <div className={'admin-item-title'}>Number of categories: </div>
          <div>
            {manifestData ? manifestData.Response.manifestData.categoriesCount : 'Loading...'}
          </div>
        </div>
      </div>
    </section>
  )
}
