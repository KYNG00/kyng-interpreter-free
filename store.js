const NAME='kyng-interpreter-free';const STORE='sessions';
let dbPromise;
function database(){return dbPromise??=new Promise((resolve,reject)=>{const open=indexedDB.open(NAME,1);open.onupgradeneeded=()=>open.result.createObjectStore(STORE,{keyPath:'id'});open.onsuccess=()=>resolve(open.result);open.onerror=()=>reject(open.error)})}
async function operation(mode,fn){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),request=fn(tx.objectStore(STORE));request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error)})}
export const getSession=id=>operation('readonly',s=>s.get(id));
export const getSessions=async()=>{const rows=await operation('readonly',s=>s.getAll());return rows.sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt))};
export const saveSession=session=>operation('readwrite',s=>s.put(session));
export const deleteSession=id=>operation('readwrite',s=>s.delete(id));
export async function importSessions(rows){for(const row of rows){if(typeof row.id==='string'&&typeof row.startedAt==='string'&&Array.isArray(row.segments))await saveSession(row)}}
