import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './Form.scss'
import 'filepond/dist/filepond.min.css'

import { createHero, changeHero, getHero } from "../../api/api";
import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(
  FilePondPluginImageExifOrientation, 
  FilePondPluginImagePreview, 
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
)

export default function Form({fillData}) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [files, setFiles] = useState([])
  const [preloadedData, setPreloadedData] = useState()

  const formRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    for(let key of e.target.elements) {
      if(key.name) {
        if(key.name == 'images') {
          for(let i = 0; i < files.length; i++) {
            data.append(files[i].file.name, files[i].file)
          }
        } else {
          data.append(key.name, key.value)
        }
      }
    }

    if(fillData) {
      await changeHero(params.get('id'), data)
      navigate('/')
    } else {
      await createHero(data)
      navigate('/')
    }
  }

  useEffect(() => {
    if(fillData) {
      getHero(params.get('id')).then(response => {
        setPreloadedData(response.data[0])
        response.data[0].images.forEach(img => {
          console.log(img)
          setFiles(prev => [...prev, {source: 'https://my-heroes-list.herokuapp.com/uploads/' + img.split('\\')[1], options: {type: 'local'}}])
        })
      })
    }
  }, [])

  return (
    <form id="form" onSubmit={handleSubmit} ref={formRef}>
      <h1>Create new hero</h1>
      <fieldset>
        <input
          required 
          type="text" 
          className="form__alter input" 
          placeholder="Alter ego" 
          name="nickname"
          defaultValue={preloadedData?.nickname}
        />
        <input
          required 
          name="real_name"
          type="text" 
          className="form__name input" 
          placeholder="Real name" 
          defaultValue={preloadedData?.real_name}
        />
        <textarea
          required 
          name="origin_description"
          type="text" 
          rows={5} 
          className="form__description input" 
          placeholder="Description"
          defaultValue={preloadedData?.origin_description} 
        />
        <textarea
          required
          name="superpowers" 
          type="text" 
          rows={5} 
          className="form__powers input" 
          placeholder="Hero powers" 
          defaultValue={preloadedData?.superpowers} 
        />
        <input
          required 
          name="catch_phrase"
          type="text" 
          className="form__phrase input"
          placeholder="Catch (iconic) phrase" 
          defaultValue={preloadedData?.catch_phrase} 
        />
      </fieldset>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        name="images"
        required={true}
        credits={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        server={{
          load(source, load) {
            const request = new Request(source)
            fetch(request).then(response => {
              response.blob().then(blob => load(blob))
            })
          }
        }}
      />
      <button 
        className="form__submit-btn"
      >{fillData ? 'Update': 'Create'}</button>
    </form>
  )
}