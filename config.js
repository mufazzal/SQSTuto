const cloudConfig = require("./cloudConfig")

const config = {
    outDir: "output",
    iamProfile: "Mufazzal_Hussain"
}

const buildArgsString = (args) => {

    return ` --stage ${cloudConfig.stage} --region ${cloudConfig.region} --userPoolArn ${cloudConfig.userPoolArn} --commonLibArn ${cloudConfig.commonLibArn} --iamProfile ${config.iamProfile}`;
}

const buildRunFunEnvString = (args) => {

    const [functionName] = args

    switch (functionName) {
        case "SQSProducer":
            return ` --env MufSQSQueUrl=${cloudConfig.MufSQSQueUrl}`
        // case "sendSNSFeed":
        //     return ` --env FeedSNSTopicARN=${cloudConfig.feedSNSTopicARN}`    
        // case "unSubscribeSNSFeed":
        //     return ` --env FeedSNSTopicARN=${cloudConfig.feedSNSTopicARN}`    
        
        default:
            return ''
    }

}



module.exports = {config, buildArgsString, buildRunFunEnvString};