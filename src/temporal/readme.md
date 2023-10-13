# NestJS with Temporal

This project demonstrates how to integrate Temporal with NestJS to execute workflows with activities.

## Overview

- **Workers:** They are responsible for running workflows and activities. Each worker listens to a specific task queue and processes tasks from that queue.
- **Activities:** These are the tasks that your workflows perform. Activities execute the business logic or side effects, such as making HTTP requests, handling I/O operations, or any other actions needed by your application.
- **Workflows:** Workflows coordinate activities. They should be deterministic and handle the orchestration of various tasks.

## Prerequisites

- Node.js installed
- Docker installed (if you want to run Temporal server locally)

## How to Run the Temporal Server

You can run Temporal server using Docker with the following command:

```sh
docker-compose -f https://github.com/temporalio/docker-compose/blob/main/docker/docker-compose.yml up
```

## How to Create and Run a Worker

1. **Create a Workflow**

    Workflows are stored in the `src/temporal/workflows` directory. Here’s a basic example of a workflow file, `example-workflow.ts`, that awaits a sleep function and then runs an activity:

    ```typescript
    import { proxyActivities, sleep } from '@temporalio/workflow';
    import type * as activities from '../activities';

    const { exampleActivity } = proxyActivities<typeof activities>({
      startToCloseTimeout: '1 minute',
    });

    export async function exampleWorkflow(name: string): Promise<string> {
      await sleep(1000);
      return exampleActivity(name);
    }
    ```

2. **Create an Activity**

    Activities are stored in the `src/temporal/activities` directory. Here’s an example of an activity file, `example-activity.ts`:

    ```typescript
    export async function exampleActivity(name: string): Promise<string> {
      return `Hello, ${name}!`;
    }
    ```

3. **Create a Worker**

    Workers are responsible for executing workflows and activities. Here’s an example of setting a worker, `temporal.module.ts`:

    ```typescript
    import { Module } from '@nestjs/common';
    import { TemporalModule } from 'nestjs-temporal';
    import { TemporalController } from './temporal.controller';
    import { TemporalService } from './temporal.service';
    import { exampleActivity } from './activities/example-activity';
    @Module({
    imports: [
        TemporalModule.registerWorker({
        workerOptions: {
            taskQueue: 'default',
            workflowsPath: require.resolve('./workflows/example-workflow'),
            activities: {
            exampleActivity,
            },
        },
        }),
        TemporalModule.registerClient(),
    ],
    controllers: [TemporalController],
    providers: [TemporalService],
    })
    export class _TemporalModule {}
    ;
    ```

   

## How to Start a Workflow

We created a service (`temporal.service.ts`) that starts the workflow using Temporal client. You can initiate a workflow execution by making an HTTP request to the NestJS application.

### Create a Controller to Trigger the Workflow

Here is an example of a controller (`temporal.controller.ts`) that starts the workflow:

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { TemporalService } from './temporal.service';

@Controller('temporal')
export class AppController {
  constructor(private readonly temporalService: TemporalService) {}

  @Get()
  async startWorkflow(@Query('name') name: string): Promise<string> {
    const result = await this.temporalService.startWorkflow(name);
    return `Workflow started, result: ${result}`;
  }
}
```

### Starting the Workflow

Send a GET request to the `/temporal` endpoint with a `name` query parameter:

```sh
curl http://localhost:3000/temporal?name=YourName
```

Replace `YourName` with the actual name you want to pass to the workflow.

## Conclusion

This README provides basic guidance on setting up Temporal with NestJS, creating workflows, activities, and workers, and triggering workflows via HTTP requests. Ensure that the Temporal server is running before starting the NestJS application.

For more advanced scenarios, refer to the official [Temporal documentation](https://docs.temporal.io/).
