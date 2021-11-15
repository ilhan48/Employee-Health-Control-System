package Threads;

public class Producer extends Thread{
		Data data;
		public Producer(Data data) {
			this.data =data;
		}
		public void run() {
			for(int i=0;i<10;i++ ) {
				data.value++;
				System.out.println("Producer: "+data.value);
		     }
		}
	}

