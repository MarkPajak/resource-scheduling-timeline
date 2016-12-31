# resource-scheduling-timeline

*installtion (on a new AWS Linux instance)

 - install git
sudo yum install git

 <code>
 git clone https://github.com/MarkPajak/resource-scheduling-timeline.git
 </code>
 - install node
 
 <code>
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
 . ~/.nvm/nvm.sh
  nvm install 4.4.5
 </code>
 
 - verify  node installation
 
 node -e "console.log('Running Node.js ' + process.version)"
 
 - update and install dependencies
  <code>
npm i -g npm-check-updates
npm-check-updates -u
 </code>
 - install global dependencies
   <code>
npm update -g
npm install
 </code>

 - install MongoDB
 
create a /etc/yum.repos.d/mongodb-org-3.2.repo file so that you can install MongoDB directly, using yum.
   <code>
[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.2.asc
 </code>

 - Install the MongoDB packages and associated tools.
    <code>
sudo yum install -y mongodb-org
 </code>
 - start the Mongod service
   <code>
sudo service mongod start
</code>
 - start the app
  <code>
npm start
 </code>
 - if all is well you will get the following message:
 
connection successful

Navigate to :3000/#!/timeline to take a look att he timeline view

