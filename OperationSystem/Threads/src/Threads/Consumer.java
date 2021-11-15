package Threads;

public class Consumer implements Runnable{
	Data data;
	public Consumer(Data data) {
		this.data = data;
	}
	@Override
	public void run() {
		for(int i=0;i<10;i++ ) {
		data.value--;
		System.out.println("Consumer: "+data.value);
		}
	}	

}
