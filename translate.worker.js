import {pipeline,env} from '@huggingface/transformers';
env.allowLocalModels=false;
let translator;
onmessage=async({data})=>{
  const {type,id,text}=data;
  if(type==='load'){
    try{postMessage({type:'status',message:'Downloading the free translation model. First load can take several minutes.'});translator=await pipeline('translation','Xenova/opus-mt-zh-en',{dtype:'q8',device:'wasm',progress_callback:p=>{if(p.status==='progress'&&p.progress)postMessage({type:'progress',progress:Math.round(p.progress)})}});postMessage({type:'ready'})}
    catch(e){postMessage({type:'error',message:String(e.message||e)})}
  }
  if(type==='translate'){
    if(!translator)return postMessage({type:'result',id,error:'The model is not ready yet.'});
    try{const result=await translator(text,{max_new_tokens:180});postMessage({type:'result',id,english:result[0]?.translation_text||''})}
    catch(e){postMessage({type:'result',id,error:String(e.message||e)})}
  }
};
