const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.right = require('../models/right.model.js')(sequelize, Sequelize);
db.poa = require('../models/poa.model.js')(sequelize, Sequelize);
db.workplace = require('../models/workplace.model.js')(sequelize, Sequelize);
db.status = require('../models/status.model.js')(sequelize, Sequelize);
db.journalisms = require('../models/journalism.model.js')(sequelize, Sequelize);

db.user.hasMany(db.poa, { as: 'Users', foreignKey: 'registrar_id' });

db.workplace.hasMany(db.user, { as: 'Workplaces', foreignKey: 'workplace_id' });
db.status.hasMany(db.user, { as: 'Statuses', foreignKey: 'status_id' });

db.user.hasMany(db.journalisms, { foreignKey: 'user_id' });
db.poa.hasMany(db.journalisms, { as: 'Poas', foreignKey: 'poa_id' });

db.right.belongsToMany(db.user, {
  through: 'user_rights',
  foreignKey: 'rightId',
  otherKey: 'userId'
});
db.user.belongsToMany(db.right, {
  through: 'user_rights',
  foreignKey: 'userId',
  otherKey: 'rightId'
});

db.RIGHTS = ['user', 'admin', 'moderator'];
// db.STATUSES = ['noactivity', 'active', 'rejection'];

/*
sequelize.query(`		--Journalizing user's account status change (both after insert and update)
create or replace function journalize_user_status_change()
returns trigger
language plpgsql
as $$
declare
	next_id integer;
	action json;
begin
		--Since ID isn't updating automatically, manually get new one
	select max(journal_id)+1 into next_id from journalisms;
	if(next_id is null) then
		next_id=1;
	end if;
	
		--Change action_description based on user's new status
	case
		when new.status_id=1 then
			action:='{"action": "Обліковий запис створено"}';
		when new.status_id=2 then
			action:='{"action": "Обліковий запис активовано"}';
		when new.status_id=3 then
			action:='{"action": "Обліковий запис деактивовано"}';
	end case;
	
		--Insert entry in journalisms table
	insert into journalisms (journal_id, action_data, action_description, "createdAt", "updatedAt", user_id)
	values(next_id, current_timestamp, action, current_timestamp, current_timestamp, new.id);
	return new;
end;
$$;

create trigger journalize_user_status_update
after insert or update of status_id on users
for each row
execute procedure journalize_user_status_change();





		--Journalizing POA's creation (after insert)
create or replace function journalize_poa_insert()
returns trigger
language plpgsql
as $$
declare
  next_id integer;
  action json;
  poa_des constant text := 'Довіреність створено';
begin
    --Since ID isn't updating automatically, manually get new one
  select max(journal_id)+1 into next_id from journalisms;
  if(next_id is null) then
    next_id=1;
  end if;
  
  action:=json_build_object('action', poa_des, 'principal_name', new.principal_name, 'principal_code', new.principal_code,
    'confident_name', new.confident_name, 'registration_date', to_char(new.registration_date, 'MM-DD-YYYY'),
    'blank_series', new.blank_series, 'blank_number', new.blank_number, 'certification_date',
    to_char(new.certification_date, 'MM-DD-YYYY'), 'register_number', new.register_number, 'expiry_date',
    to_char(new.expiry_date, 'MM-DD-YYYY'));
  
    --Insert entry in journalisms table
  insert into journalisms (journal_id, action_data, action_description, "createdAt", "updatedAt", user_id, poa_id)
  values(next_id, current_timestamp, action, current_timestamp, current_timestamp, new.registrar_id, new.id);
  return new;
end;

$$;

create trigger journalize_poa_insert_trigger
after insert on poas
for each row
when (new.is_duplicate=false)
execute procedure journalize_poa_insert();






		--Journalizing POA's update (after update)
create or replace function journalize_poa_update()
returns trigger
language plpgsql
as $$
declare
	next_id integer;
	action json;
  poa_des constant text := 'Довіреність оновлено';
begin
		--Since ID isn't updating automatically, manually get new one
	select max(journal_id)+1 into next_id from journalisms;
	if(next_id is null) then
		next_id=1;
	end if;
	
	action:=json_build_object('action', poa_des, 'old_principal_name', old.principal_name, 'old_principal_code', old.principal_code,
		'old_confident_name', old.confident_name, 'old_registration_date', to_char(old.registration_date, 'MM-DD-YYYY'),
		'old_blank_series', old.blank_series, 'old_blank_number', old.blank_number, 'old_certification_date',
		to_char(old.certification_date, 'MM-DD-YYYY'), 'old_register_number', old.register_number, 'old_expiry_date',
		to_char(old.expiry_date, 'MM-DD-YYYY'), 'new_principal_name', new.principal_name, 'new_principal_code', new.principal_code,
		'new_confident_name', new.confident_name, 'new_registration_date', to_char(new.registration_date, 'MM-DD-YYYY'),
		'new_blank_series', new.blank_series, 'new_blank_number', new.blank_number, 'new_certification_date',
		to_char(new.certification_date, 'MM-DD-YYYY'), 'new_register_number', new.register_number, 'new_expiry_date',
		to_char(new.expiry_date, 'MM-DD-YYYY'));
	
		--Insert entry in journalisms table
	insert into journalisms (journal_id, action_data, action_description, "createdAt", "updatedAt", user_id, poa_id)
	values(next_id, current_timestamp, action, current_timestamp, current_timestamp, new.registrar_id, new.poa_id);
	return new;
end;
$$;

create trigger journalize_poa_update_trigger
after update on poas
for each row
execute procedure journalize_poa_update();






		--Journalizing POA's duplicate creation (after insert)
create or replace function journalize_poa_insert_duplicate()
returns trigger
language plpgsql
as $$
declare
	next_id integer;
	action json;
  poa_des constant text := 'Дублікат довіреності створено';
begin
		--Since ID isn't updating automatically, manually get new one
	select max(journal_id)+1 into next_id from journalisms;
	if(next_id is null) then
		next_id=1;
	end if;
	
	action:=json_build_object('action', poa_des, 'principal_name', new.principal_name, 'principal_code', new.principal_code,
		'confident_name', new.confident_name, 'registration_date', to_char(new.registration_date, 'MM-DD-YYYY'),
		'blank_series', new.blank_series, 'blank_number', new.blank_number, 'certification_date',
		to_char(new.certification_date, 'MM-DD-YYYY'), 'register_number', new.register_number, 'expiry_date',
		to_char(new.expiry_date, 'MM-DD-YYYY'));
	
		--Insert entry in journalisms table
	insert into journalisms (journal_id, action_data, action_description, "createdAt", "updatedAt", user_id, poa_id)
	values(next_id, current_timestamp, action, current_timestamp, current_timestamp, new.registrar_id, new.poa_id);
	return new;
end;
$$;

create trigger journalize_poa_insert_duplicate_trigger
after insert on poas
for each row
when (new.is_duplicate=true)
execute procedure journalize_poa_insert_duplicate()
`);
*/

module.exports = db;
