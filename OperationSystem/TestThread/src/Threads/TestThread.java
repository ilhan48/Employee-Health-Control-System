package Threads;

public class TestThread {

	public static void main(String[] args) {
		
		Data data = new Data();
		data.value =100;
		Producer producer = new Producer(data);
		Consumer consumer = new Consumer(data);
		Thread thread = new Thread(consumer);
		producer.start();
		thread.start();

	}
	class Producer extends Thread{
		Data d;
		public Producer(Data d) {
			this.d =d;
		}
		public void run() {
			for(int i=0;i<10;i++ ) {
				d.value++;
				System.out.println("Producer: "+d.value);
		     }
		}
	}
	
	class Consumer implements Runnable{
		Data d;
		public Consumer(Data d) {
			this.d = d;
		}
		@Override
		public void run() {
			for(int i=0;i<10;i++ ) {
			d.value--;
			System.out.println("Consumer: "+d.value);
			}
		}	
	
	}
	class Data {
		int value;
	}
}
