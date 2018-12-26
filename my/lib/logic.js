/**
 * Sample transaction processor function.
 * @param {org.my.basic.CreateAccount} set The sample transaction instance.
 * @transaction
 */
async function CreateAccount(tx) {

  const factory = getFactory();

  const nameSpace = 'org.my.basic';

  // create primaryKey
  let primaryKey = tx.total.user;
  let newTotalUser = parseFloat(tx.total.user) + 1;
  tx.total.user = String(newTotalUser);
  const newTotal = await getAssetRegistry(nameSpace + '.Total');
  await newTotal.update(tx.total);


  let participantRegistry = await getParticipantRegistry(nameSpace + '.User');
  let userDataRegistry = await getAssetRegistry(nameSpace + '.UserData');
  let userLogRegistry = await getAssetRegistry(nameSpace + '.UserLog');

  const user = factory.newResource(nameSpace, 'User', primaryKey);
  const data = factory.newResource(nameSpace, 'UserData', primaryKey);
  const log = factory.newResource(nameSpace, 'UserLog', primaryKey);

  // set asset UserData
  data.email = tx.email;
  data.password = tx.password;
  data.name = tx.name;
  data.dateOfBirth = tx.dateOfBirth;
  data.gender = tx.gender;

  // set asset UserLog
  log.logKeyBox = ["new"];

  // create
  await participantRegistry.add(user);
  await userDataRegistry.add(data);
  await userLogRegistry.add(log);

  // event
  const event = factory.newEvent(nameSpace, 'CreateAcountTransaction');
  event.primaryKey = primaryKey;
  event.email = tx.email;
  event.name = tx.name;
  event.dateOfBirth = tx.dateOfBirth;
  event.gender = tx.gender;
  emit(event);
}


/**
 * Sample transaction processor function.
 * @param {org.my.basic.UserAction} set The sample transaction instance.
 * @transaction
 */
async function UserAction(tx) {

  const factory = getFactory();
  const nameSpace = 'org.my.basic';

  // create logKey
  let key = tx.total.logKey;
  let newTotalLogKey = parseFloat(tx.total.logKey) + 1;
  tx.total.logKey = String(newTotalLogKey);
  const newTotal = await getAssetRegistry(nameSpace + '.Total');
  await newTotal.update(tx.total);

  // add asset UserAction
  let assetRegistry = await getAssetRegistry(nameSpace + '.LogAction');
  const log = factory.newResource(nameSpace, 'LogAction', key);

  log.user = tx.user.primaryKey;
  log.appId = tx.appId;
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
  event.logKey = key;
  event.user = tx.user.primaryKey;
  event.appId = tx.appId;
  event.contents = tx.contents;
  emit(event);
}
