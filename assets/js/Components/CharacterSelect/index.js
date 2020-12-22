import React, { useEffect, useState } from 'react'

import { GetProfile } from '../../Utils/API/API_Requests'

export default function CharacterSelect() {
  const [platform, setPlatform] = useState()
  const [character, setCharacter] = useState()

  useEffect(() => {
    const fetchPlatform = async () => {
      const result = await GetProfile({
        params: {},
      })
      setPlatform(result)
    }
    fetchPlatform()
  }, [])
}
