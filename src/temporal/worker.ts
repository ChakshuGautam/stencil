import { NativeConnection, Worker } from '@temporalio/worker';
// import { exampleWorkflow } from './workflows/example-workflow';
import { exampleActivity } from './activities/example-activity';

export async function runWorker() {
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // TLS and gRPC metadata configuration goes here.
  });
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    workflowsPath: __dirname + '/workflows',

    // Workflows are registered using a path as they run in a separate JS context.
    // workflowsPath: require.resolve('./workflows'),
    activities: {
      exampleActivity,
    },
    taskQueue: 'my-task-queue',
  });

  await worker.run();
}

// runWorker().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
