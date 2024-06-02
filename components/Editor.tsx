'use client'
import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setvalue] = useState(entry.content)
  const [loading, setloading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setloading(true)
      const updated = updateEntry(entry.id, _value)

      setloading(false)
    },
  })
  return (
    <div className="w-full h-full">
      {loading && <div>Saving...</div>}
      <textarea
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        className="w-full h-full p-7 text-xl outline-none bg-zinc-400/10"
      />
    </div>
  )
}
export default Editor
