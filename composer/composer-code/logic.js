/**
 * Sample transaction processor function.
 * @param {org.example.basic.CreateAccount} set The sample transaction instance.
 * @transaction
 */
async function CreateAccount(tx) {

  const factory = getFactory();

  const nameSpace = 'org.example.basic';

  let participantRegistry = await getParticipantRegistry('org.example.basic.User');
  let userDataRegistry = await getAssetRegistry('org.example.basic.UserData');
  let LogUserboxRegistry = await getAssetRegistry('org.example.basic.LogUserbox');

  const user = factory.newResource(nameSpace, 'User', tx.primaryKey);
  const data = factory.newResource(nameSpace, 'UserData', tx.primaryKey);
  const box = factory.newResource(nameSpace, 'LogUserbox', tx.primaryKey);

  // set participant User
  user.userId = tx.userId;

  // set asset UserData
  data.name = tx.name;
  data.gender = tx.gender;
  data.dateOfBirth = tx.dateOfBirth;
  data.address = tx.address;
  data.email = tx.email;
  data.userId = tx.userId;
  data.password = tx.password;
  data.nickName = tx.nickName;
  data.appId = ["app#0"];

  // set asset UserLog
  const text = "createAccount"
  box.keyBox = [text];

  // create
  await participantRegistry.add(user);
  await userDataRegistry.add(data);
  await LogUserboxRegistry.add(box);

  // event
  const event = factory.newEvent(nameSpace, 'CreateAcountTransaction');
  event.primaryKey = tx.primaryKey;
  event.name = tx.name;
  event.gender = tx.gender;
  event.dateOfBirth = tx.dateOfBirth;
  event.address = tx.address;
  event.email = tx.email;
  event.userId = tx.userId;
  event.password = tx.password;
  event.nickName = tx.nickName;
  emit(event);
}


/**
 * Sample transaction processor function.
 * @param {org.example.basic.UserAction} set The sample transaction instance.
 * @transaction
 */
async function UserAction(tx) {

  const factory = getFactory();
  const nameSpace = 'org.example.basic';

  let assetRegistry = await getAssetRegistry('org.example.basic.LogAction');

  const log = factory.newResource(nameSpace, 'LogAction', tx.logKey);

  log.appId = tx.appId;
  log.userId = tx.userId;
  log.contents = tx.contents;


  await assetRegistry.add(log);

  const event = factory.newEvent(nameSpace, 'LogUserActionTransaction');
  event.logKey = tx.logKey;
  event.appId = tx.appId;
  event.userId = tx.userId;
  event.contents = tx.contents;
  emit(event);
}
