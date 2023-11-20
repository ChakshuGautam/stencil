import { Injectable } from '@nestjs/common';
import { WorkflowClient } from '@temporalio/client';
import { exampleWorkflow } from './workflows/example-workflow';
@Injectable()
export class TemporalService {
  private workflowClient = new WorkflowClient();

  async startWorkflow(name: string): Promise<string> {
    const workflow = await this.workflowClient.start(exampleWorkflow, {
      taskQueue: 'default',
      // type inference works! args: [name: string]
      args: [name],
      // in practice, use a meaningful business ID, like customerId or transactionId
      workflowId: 'workflow-' + new Date().valueOf(),
    });

    const handle = this.workflowClient.getHandle(workflow.workflowId);
    const result = await handle.result();
    return result;
  }
}
