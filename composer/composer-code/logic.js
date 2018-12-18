/**
 * Sample transaction processor function.
 * @param {org.myai.basic.CreateAccount} set The sample transaction instance.
 * @transaction
 */
async function CreateAccount(tx) {
  
  const factory = getFactory();
  
  const nameSpace = 'org.myai.basic';
  const primaryKey = tx.primaryKey;
  
  let participantRegistry = await getParticipantRegistry(nameSpace + '.User');
  let userDataRegistry = await getAssetRegistry(nameSpace + '.UserData');
  let userLogRegistry = await getAssetRegistry(nameSpace + '.UserLog');

  const user = factory.newResource(nameSpace, 'User', primaryKey);
  const data = factory.newResource(nameSpace, 'UserData', primaryKey);
  const log = factory.newResource(nameSpace, 'UserLog', primaryKey);

  // set asset UserData
  data.name = tx.name;
  data.gender = tx.gender;
  data.age = tx.age;
  data.address = tx.address;
  
  // set asset UserLog
  log.logKeyBox = ["new"];
  
  // create
  await participantRegistry.add(user);
  await userDataRegistry.add(data);
  await userLogRegistry.add(log);

  // event
  const event = factory.newEvent(nameSpace, 'CreateAcountTransaction');
  event.primaryKey = tx.primaryKey;
  event.name = tx.name;
  event.gender = tx.gender;
  event.age = tx.age;
  event.address = tx.address;
  emit(event);
}


/**
 * Sample transaction processor function.
 * @param {org.myai.basic.UserAction} set The sample transaction instance.
 * @transaction
 */
async function UserAction(tx) {
  
  const factory = getFactory();
  const nameSpace = 'org.myai.basic';
  
  // add asset UserAction
  const key = tx.logKey;
  let assetRegistry = await getAssetRegistry(nameSpace + '.LogAction');  
  const log = factory.newResource(nameSpace, 'LogAction', key);
  
  log.user = tx.user.primaryKey;
  log.shopId = tx.shopId;
  log.contents = tx.contents;

  await assetRegistry.add(log);
  
  
  // update asset UserLog
  const oldKey = tx.user.logKeyBox;
  let array = [];
  for(let i = 0; i < oldKey.length; i++) {
  	array.push(oldKey[i]); 
  }
  array.push(key);
  tx.user.logKeyBox = array;

  const logAsset = await getAssetRegistry(nameSpace + '.UserLog');
  await logAsset.update(tx.user);
  
  // event
  const event = factory.newEvent(nameSpace, 'LogUserActionTransaction');
  event.logKey = tx.logKey;
  event.user = tx.user.primaryKey;
  event.shopId = tx.shopId;
  event.contents = tx.contents;
  emit(event);
}